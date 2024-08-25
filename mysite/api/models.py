from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
from babel.dates import format_date


# Duration in days
SUBSCRIPTION_DURATIONS = (
    (30, '1 miesiąc'),
    (365, '12 miesięcy')
)

ORGANIZATION_CHOICES = (
    ('Kinder', 'Przedszkole'),
    ('Pre-School', 'Szkoła Podstawowa'),
)

CURRENCY_CHOICES = (
    ('zł', 'Polska złotówka'),
    ('USD', 'Amerykański dolar'),
    ('EUR', 'Euro')
)


class Playlist(models.Model):
    playlist_index = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=70)
    image = models.CharField(max_length=30, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class City(models.Model):
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Organization(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=50)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    category = models.CharField(choices=ORGANIZATION_CHOICES, max_length=20)

    postal_code = models.CharField(max_length=8)
    phone_num = models.CharField(max_length=12, blank=True)
    contacted = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    status = models.BooleanField(default=False)

    @property
    def region(self):
        return self.city.region.name

    def __str__(self):
        return self.name


class Customer(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=12)
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        blank=True,
        null=True)
    stripe_customer_id = models.CharField(blank=True, max_length=200)
    video_index = models.IntegerField(default=3)

    @property
    def active(self):
        userSubscriptions = Subscription.objects.filter(
            user=self.user).order_by("-start_date")
        for userSub in userSubscriptions:
            if userSub.paid:
                return True
        return False

    def __str__(self):
        return self.user.email


class Payment(models.Model):
    stripe_invoice_id = models.CharField(max_length=50)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Duration(models.Model):
    time = models.CharField(max_length=30)
    days = models.IntegerField()

    def __str__(self) -> str:
        return self.time


class Price(models.Model):
    amount = models.FloatField()
    currency = models.CharField(choices=CURRENCY_CHOICES, max_length=3)

    def __str__(self) -> str:
        return f"{self.amount} {self.currency}"


class SubscriptionItem(models.Model):
    duration = models.ForeignKey(Duration, on_delete=models.CASCADE)
    price = models.ForeignKey(Price, on_delete=models.CASCADE)
    stripe_price_id = models.CharField(blank=True, max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"Price: {self.price.amount}{self.price.currency} - Days: {self.duration}"


class CheckoutForm(models.Model):
    city = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=10)
    nip = models.CharField(max_length=20, blank=True, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    autoRenewal = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} - {self.city}"


class Subscription(models.Model):
    checkoutForm = models.ForeignKey(
        CheckoutForm,
        on_delete=models.CASCADE,
        blank=True,
        null=True)
    subscription_item = models.ForeignKey(
        SubscriptionItem,
        on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE)
    paid = models.BooleanField(default=False)
    payment = models.ForeignKey(
        Payment,
        on_delete=models.SET_NULL,
        blank=True,
        null=True)
    stripe_subscription_id = models.CharField(max_length=200, blank=True)
    automatic_pay = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} from {self.start_date.date()} to {self.end_date.date()} - paid: {self.paid}"

    @property
    def end_date(self):
        days = self.subscription_item.duration.days
        return self.start_date + timedelta(days=days)

    @property
    def polish_start_date(self):
        return format_date(self.start_date.date(), locale="pl")

    @property
    def polish_end_date(self):
        return format_date(self.end_date.date(), locale="pl")


class CheckoutSession(models.Model):
    id = models.CharField(primary_key=True, max_length=200)
    stripe_id = models.CharField(max_length=200)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)


class Video(models.Model):
    resource_key = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=100)
    embed = models.CharField(max_length=300)
    free = models.BooleanField(default=False)
    playlist = models.ForeignKey(
        Playlist,
        on_delete=models.CASCADE,
        blank=True,
        null=True)
    index = models.IntegerField(blank=True, null=True, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.playlist}: {self.index}. {self.name}"


class UserVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.user)
