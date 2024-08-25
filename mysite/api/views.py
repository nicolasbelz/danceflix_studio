import os
from rest_framework import generics, status
from api.models import SubscriptionItem, Video, UserVideo, Customer, Subscription, CheckoutSession
from api.serializers import SubscriptionItemSerializer, VideoSerializer, RegisterSerializer, CheckoutSerializer, SubscriptionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
import stripe
import uuid
from django.shortcuts import redirect
from api.utils import refreshUserVideos, log


if os.getenv("PYTHONANYWHERE_DOMAIN"):
    stripe.api_key = "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"
else:
    stripe.api_key = "sk_test_51JEd1UA6dAUmWfXk9ssz2dHsdzqJTJpt4puGzMIam46JTSpBJXJBXbUz79SbXEetwpyInjLkThaB9yFBDu96mNLM00lpnG6sFQ"


# YOUR_DOMAIN = "https://www.ictir-polska.com"
YOUR_DOMAIN = "https://www.danceflix.pl"


# Create your views here.
class SubscriptionItemListView(generics.ListAPIView):

    serializer_class = SubscriptionItemSerializer
    queryset = SubscriptionItem.objects.all().order_by("id")


class GetHomepageVideo(APIView):

    def get(self, request, *args, **kwargs):
        try:
            video = Video.objects.get(index=1)
            serializer = VideoSerializer(video)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"message": "Video does not exist"},
                            status=status.HTTP_200_OK)


class GetVideosListView(generics.ListAPIView):

    serializer_class = VideoSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            try:
                customer = Customer.objects.get(user=self.request.user)
            except ObjectDoesNotExist:
                return Video.objects.filter(free=True).order_by("index")
            
            print(customer)
            if customer.active:
                return Video.objects.all().order_by("index")
                # django api first objects

            return Video.objects.filter(free=True).order_by("index")
        return Video.objects.filter(free=True).order_by("index")


class GetVideoView(APIView):
    def get(self, request, *args, **kwargs):
        resource_key = kwargs.get("resource_key")
        try:
            video = Video.objects.get(resource_key=resource_key)
        except ObjectDoesNotExist:
            return Response({"message": "Video does not exist!"},
                            status=status.HTTP_400_BAD_REQUEST)

        if video.free:
            return Response({"embed": video.embed}, status=status.HTTP_200_OK)

        if self.request.user.is_anonymous:
            return Response({"message": "No permission."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            UserVideo.objects.get(user=self.request.user, video=video)
            return Response({"embed": video.embed}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"message": "No permission."},
                            status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, *args, **kwargs):
        serializer = RegisterSerializer(data=self.request.data)

        if not serializer.is_valid():
            return Response(data={"message": serializer.errors})

        data = serializer.validated_data

        try:
            user = User.objects.create_user(
                username=data["email"],
                first_name=data["first_name"],
                last_name=data["last_name"],
                email=data["email"],
                password=data["password"]
            )
        except Exception as err:
            return Response(
                data={"message": str(err)},
                status=status.HTTP_400_BAD_REQUEST)

        stripeCustomer = stripe.Customer.create(
            email=data['email'],
            preferred_locales=["pl"]
        )

        try:
            Customer.objects.create(
                user=user,
                stripe_customer_id=stripeCustomer["id"],
                phone=data["phone"]
            )
        except Exception as e:
            return Response(
                data={
                    "message": str(err)},
                status=status.HTTP_400_BAD_REQUEST)

        return Response(
            data={
                "success": "Pomyślnie utworzono użytkownika!"},
            status=status.HTTP_200_OK)


class CheckoutView(APIView):
    permision_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        log(f"Checkout request {self.request.user}.", "checkout")
        try:
            Subscription.objects.get(user=self.request.user, paid=True)
            log(f"User {self.request.user} has a subscription already.", "checkout")
            return Response(
                data={
                    "message": "Masz już aktywną subskrypcje!"},
                status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            log(f"User {self.request.user} does not have a subscription already.", "checkout")

        log(f"Checkout data {self.request.POST}", "checkout")
        checkoutFormData = {
            key: item for key,
            item in self.request.data.items()}
        log(f"Got checkout data {checkoutFormData}", "checkout")

        if "duration" not in checkoutFormData.keys(
        ) or "currency" not in checkoutFormData.keys():
            log(f"Invalid data {checkoutFormData} provided by user.", "checkout")
            return Response(
                data={
                    "message": "Podano niepoprawne dane!"},
                status=status.HTTP_200_OK)

        duration = checkoutFormData.pop('duration')
        currency = checkoutFormData.pop('currency')

        # Get SubscriptionItem
        try:
            subscriptionItem = SubscriptionItem.objects.get(
                price__currency=currency, duration__days=duration)
        except ObjectDoesNotExist:
            log("Invalid server settings.", "checkout")
            return Response(
                data={
                    "message": "Niema takiego produktu!"},
                status=status.HTTP_400_BAD_REQUEST)
        except MultipleObjectsReturned:
            log("Invalid server settings.", "checkout")
            return Response(
                data={
                    "message": "Zbyt wiele ofert."},
                status=status.HTTP_400_BAD_REQUEST)

        serializer = CheckoutSerializer(data=checkoutFormData)
        log("Checkout serializer created.", "checkout")

        if not serializer.is_valid():
            log(
                f"Invalid data provided by user {serializer.errors}.",
                "checkout")
            return Response(
                data={
                    "message": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST)

        log("Valid serializer.", "checkout")

        checkoutForm = serializer.save()

        # Create subscription
        try:
            subscription = Subscription.objects.create(
                checkoutForm=checkoutForm,
                subscription_item=subscriptionItem,
                user=self.request.user
            )
        except Exception as e:
            log("Can't create subscription.", "checkout")
            return Response(
                data={
                    "message": "Can't create subscription."},
                status=status.HTTP_400_BAD_REQUEST)

        log("Subscription created.", "checkout")

        nip = serializer.validated_data.get('nip')

        # if nip:

        #     # NIP validation
        #     companyInfo = getCompanyInfoByNip(nip)

        #     # Add customer company name
        #     stripe.Customer.modify(self.request.user.stripe_customer_id, )

        #     stripe.Customer.modify(self.request.user.stripe_customer_id,
        #                             name=companyInfo["name"],
        #                             address={
        #                                 "city": companyInfo["city"],
        #                                 "country": "pl",
        #                                 # "line1": billing_address.street_address,
        #                                 # "line2": billing_address.apartment_address,
        #                                 # "postal_code": billing_address.zip_code
        #                             })

        #     # Create tax id for customer
        #     stripe.Customer.create_tax_id(
        #         self.request.user.stripe_customer_id,
        #         type="eu_vat",
        #         value="PL"+nip,
        #     )

        checkout_session = CheckoutSession(id=str(uuid.uuid4()),
                                           customer=self.request.user,
                                           subscription=subscription,
                                           )

        try:
            customer = Customer.objects.get(user=self.request.user)
        except ObjectDoesNotExist:
            log("Can't get Customer object for given user.", "checkout")
            return Response(
                data={
                    "message": "Niema takiego uzytkownika."},
                status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create stripe checkout session
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price': subscriptionItem.stripe_price_id,
                        'quantity': 1,
                    },
                ],
                mode='subscription',
                success_url=YOUR_DOMAIN +
                '/api/payment-processing/' +
                checkout_session.id +
                "/",
                cancel_url=YOUR_DOMAIN +
                '/api/payment-processing/' +
                checkout_session.id +
                "/",
                locale="pl",
                customer=customer.stripe_customer_id,
                tax_id_collection={
                    "enabled": True if nip else False},
                customer_update={
                    "name": 'auto',
                    "address": 'auto'})
            log(f"Stripe object created for {self.request.user}.", "checkout")
            # Pass in the stripe session ID into my custom session object
            checkout_session.stripe_id = session["id"]

            checkout_session.save()

        except stripe.error.CardError as e:
            # Since it's a decline, stripe.error.CardError will be caught
            body = e.json_body
            err = body.get('error', {})
            return Response(
                data={
                    "message": err},
                status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            return Response(
                data={
                    "message": "Too many requests"},
                status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            return Response(
                data={
                    "message": f"Invalid parameters {e}"},
                status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response(
                data={
                    "message": "Authentication with Stripe's API failed"},
                status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response(
                data={
                    "message": "Network communication with Stripe failed"},
                status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response(
                data={
                    "message": "Error"},
                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                data={
                    "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST)

        return Response(data={"url": session.url}, status=status.HTTP_200_OK)


class PaymentProcessing(APIView):
    def get(self, *args, **kwargs):
        session_id = kwargs["session_id"]
        try:
            checkoutSession = CheckoutSession.objects.get(id=session_id)
        except ObjectDoesNotExist:
            print("Checkout session does not exist.")
            return redirect("/")

        stripeSession = stripe.checkout.Session.retrieve(
            checkoutSession.stripe_id)

        subscription = checkoutSession.subscription

        # Stripe checkout session not paid
        if stripeSession["payment_status"] != "paid":
            subscription.delete()
            print("Not Paid!")
            return redirect("/")

        subscription.paid = True

        # Get automatic pay value
        automatic_pay = subscription.checkoutForm.autoRenewal

        # Pass info about automatic pay to stripe
        stripe.Subscription.modify(
            stripeSession["subscription"],
            cancel_at_period_end=(
                not automatic_pay))

        # Pass in the stripe subscription ID
        # subscription.stripe_subscription_id = stripeSession["subscription"]

        subscription.save()
        log("Saved subscription correctly!", "checkout")
        log(f"Subscription created correctly and saved as {subscription.paid} for user {subscription.user.email}!", "checkout")

        refreshUserVideos(subscription.user)
        log(f"Created videos for {subscription.user.email}!", "checkout")
        return redirect("/")


class LastUserSubscriptions(APIView):
    permision_classes = [IsAuthenticated]

    def get(self, *args, **kwargs):
        user = self.request.user
        subscriptions = Subscription.objects.filter(user=user)

        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class GetCurrentSubscription(APIView):
    permision_classes = [IsAuthenticated]

    def get(self, *args, **kwargs):
        user = self.request.user

        try:
            subscription = Subscription.objects.get(user=user, paid=True)
            serializer = SubscriptionSerializer(subscription)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(
                data={
                    "message": "Nie posiadasz aktywnej subskrypcji."},
                status=status.HTTP_200_OK)

        except MultipleObjectsReturned:
            subscriptions = list(
                Subscription.objects.filter(
                    user=user, paid=True))
            activeSubscription = subscriptions.pop(-1)
            for sub in subscriptions:
                sub.delete()

            serializer = SubscriptionSerializer(activeSubscription)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
