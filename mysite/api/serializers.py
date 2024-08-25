from rest_framework import serializers
from api.models import SubscriptionItem, Price, Duration, Video, UserVideo, CheckoutForm, Subscription


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = ["amount", "currency"]


class DurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Duration
        fields = ["time", "days"]


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["resource_key", "embed", "name", "description"]


class UserVideoSerializer(serializers.ModelSerializer):
    video = VideoSerializer()

    class Meta:
        model = UserVideo
        fields = ["video", "user"]


# class Currency(serializers.ModelSerializer):
#     class Meta:
#         model = Duration
#         fields = ["time", "days"]

class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=60)
    last_name = serializers.CharField(max_length=60)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=60)
    password = serializers.CharField(max_length=70)
    password2 = serializers.CharField(max_length=70)


class SubscriptionItemSerializer(serializers.ModelSerializer):
    price = PriceSerializer()
    duration = DurationSerializer()

    class Meta:
        model = SubscriptionItem
        fields = ["price", "duration"]


class SubscriptionSerializer(serializers.ModelSerializer):
    subscription_item = SubscriptionItemSerializer()

    class Meta:
        model = Subscription
        fields = [
            "subscription_item",
            "polish_start_date",
            "polish_end_date",
            "paid",
            "automatic_pay"]


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckoutForm
        fields = [
            "city",
            "postal_code",
            "nip",
            "first_name",
            "last_name",
            "address"]
