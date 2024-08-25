from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Subscription
from django.utils import timezone


class Command(BaseCommand):
    help = 'Validate subscriptions!'

    def handle(self, *args, **options):

        for subscription in Subscription.objects.filter(paid=True):
            if timezone.now() > subscription.end_date:
                subscription.paid = False
                self.stdout.write(self.style.SUCCESS(f'Zgaszono subskrypcje dla uzytkownika {subscription.user}'))
                self.stdout.write(self.style.SUCCESS(f'Aktualna data: {timezone.now()} Koniec subskrypcji: {subscription.end_date}'))
                subscription.save()
        
        for user in User.objects.all():
            activeSubscriptions = Subscription.objects.filter(user=user, paid=True)
            n = len(activeSubscriptions)
            if n > 1:
                self.stdout.write(self.style.WARNING(f'Zbyt duza liczba aktywnych subskrypcji dla uzytkownika {user}'))
                for i in range(n - 1):
                    activeSubscriptions[i].delete()

        self.stdout.write(self.style.SUCCESS('Pomyslnie zakonczono!'))
        # except Exception as e:
        #     sendEmail("nicolasbelz10@gmail.com", str(e))
        #     self.stdout.write(self.style.SUCCESS('Blad!!! Wyslano email z komunikatem!'))
