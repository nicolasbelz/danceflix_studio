from django.core.management.base import BaseCommand
from api.models import Subscription, Customer
from datetime import datetime


class Command(BaseCommand):
    help = 'Update indexes'

    def handle(self, *args, **options):
        subscriptions = Subscription.objects.filter(paid=True)
        if datetime.now().weekday() == 1:
            for subscription in subscriptions:
                user = subscription.user
                customer = Customer.objects.get(user=user)
                customer.video_index += 1
                customer.save()
                self.stdout.write(
                    self.style.SUCCESS('Zaktualizowano uzytkownika!'))

        self.stdout.write(self.style.SUCCESS('Pomyslnie zakonczono!'))
