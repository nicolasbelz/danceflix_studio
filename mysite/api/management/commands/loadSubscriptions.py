from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Customer, Subscription, SubscriptionItem
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
import pytz


class Command(BaseCommand):
    help = 'Get all videos from Vimeo!'

    def handle(self, *args, **options):
        # User.objects.create_user(username=)
        with open("mysite/subscriptions.txt", 'r') as f:
            lines = f.readlines()
            for line in lines:
                subscription = line.strip().split(";")

                duration = subscription[0]
                price = subscription[1]
                currency = subscription[2]
                category = subscription[3]
                views_per_video = subscription[4]
                start_date = subscription[5]
                end_date = subscription[6]
                email = subscription[7]

                subscription_item = SubscriptionItem.objects.all()[0]
                date = start_date[:10]
                time = start_date[11:19]

                date = date.split("-")
                time = time.split(":")

                start_date = datetime(
                    year=int(date[0]),
                    month=int(date[1]),
                    day=int(date[2]),
                    hour=int(time[0]),
                    minute=int(time[1]),
                    second=int(time[2]),
                    tzinfo=pytz.UTC)

                try:
                    user = User.objects.get(email=email)
                    sub, created = Subscription.objects.get_or_create(
                        subscription_item=subscription_item,
                        user=user,
                        start_date=start_date,
                        stripe_subscription_id='',
                    )

                    sub.start_date = start_date
                    sub.save()

                except ObjectDoesNotExist:
                    print("User not found")

                # print("Username: ", username)
                # print("Email: ", email)
                # print("Password: ", password)
                # print("Phone: ", phone)
                # print("Video index: ", videoIndex)
                # print("Stripe customer ID: ", stripeCustomerID)
                # print()

        f.close()

        self.stdout.write(self.style.SUCCESS(f'Pomyslnie zakonczono!'))
