from django.core.management.base import BaseCommand
from api.models import Organization, Region, City


class Command(BaseCommand):
    help = 'Get all videos from Vimeo!'

    def handle(self, *args, **options):
        Organization.objects.all().delete()
        with open("mysite/organizations.csv", 'r') as f:
            lines = f.readlines()
            for line in lines:
                organization = line.strip().split(";")

                name = organization[0]
                address = organization[1]
                region, created = Region.objects.get_or_create(name=organization[3])
                city, created = City.objects.get_or_create(name=organization[2], region=region)
                category = organization[4]
                postal_code = organization[5]
                phone = organization[6]
                contacted = organization[7]
                description = organization[8]
                status = organization[9]

                params = {
                    "name": name,
                    "address": address,
                    "city": city,
                    "category": category,
                    "postal_code": postal_code,
                    "phone_num": phone,
                    "contacted": True if contacted == "True" else False,
                    "description": description,
                    "status": True if status == "True" else False
                }
                
                organization = Organization.objects.create(**params)
                print(f"Organization {organization} created sucessfuly")

