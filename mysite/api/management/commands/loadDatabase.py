from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Customer


class Command(BaseCommand):
    help = 'Get all videos from Vimeo!'

    def handle(self, *args, **options):
        # User.objects.create_user(username=)
        with open("mysite/users.txt", 'r') as f:
            lines = f.readlines()
            for line in lines:
                user = line.strip().split(";")

                first_name = user[0]
                last_name = user[1]
                username = user[2]
                email = user[3]
                password = user[4]
                phone = user[5]
                videoIndex = user[6]
                stripeCustomerID = user[7]

                user, created = User.objects.get_or_create(
                    first_name=first_name, last_name=last_name, username=username, email=email, password=password)
                customer = Customer.objects.get_or_create(
                    user=user,
                    phone=phone,
                    stripe_customer_id=stripeCustomerID,
                    video_index=videoIndex
                )

                # print("Username: ", username)
                # print("Email: ", email)
                # print("Password: ", password)
                # print("Phone: ", phone)
                # print("Video index: ", videoIndex)
                # print("Stripe customer ID: ", stripeCustomerID)
                # print()

        f.close()

        self.stdout.write(self.style.SUCCESS(f'Pomyslnie zakonczono!'))
