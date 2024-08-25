from django.core.management.base import BaseCommand
from api.models import Customer, Subscription, UserVideo, Video
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist


class Command(BaseCommand):
    help = 'Update user videos!'

    def handle(self, *args, **options):
        subscriptions = Subscription.objects.filter(paid=True)
        for subscription in subscriptions:
            user = subscription.user

            try:
                customer = Customer.objects.get(user=user)
                for i in range(1, customer.video_index + 1):

                    try:
                        video = Video.objects.get(index=i)
                        userVideo, created = UserVideo.objects.get_or_create(
                            video=video, user=user)

                        if created:
                            self.stdout.write(
                                self.style.SUCCESS(f'Video sucessfully created for {user}!'))

                    except ObjectDoesNotExist:
                        pass
                    except MultipleObjectsReturned:
                        pass

            except ObjectDoesNotExist:
                pass

        self.stdout.write(self.style.SUCCESS('Pomyslnie zakonczono!'))
