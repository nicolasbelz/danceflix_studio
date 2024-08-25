from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Create admin."

    def handle(self, *args, **options):
        try:
            User.objects.get(username="admin")
        except ObjectDoesNotExist:
            User.objects.create_superuser('admin', 'admin@example.com',
                                          '1234mat')
            self.stdout.write(self.style.SUCCESS('Admin user created!'))
        self.stdout.write(self.style.SUCCESS('Success!'))
