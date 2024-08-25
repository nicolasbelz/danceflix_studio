from django.core.management.base import BaseCommand
import vimeo
from api.models import Video
from django.core.exceptions import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'Get all videos from Vimeo!'

    def handle(self, *args, **options):

        client = vimeo.VimeoClient(
            token='2437290a883d4224248f82951e7f7bb7',
            key='683cdccab43b2737936dfd4970dda2cbc63e8ed8',
            secret='przgGJWyod8Y7cC2UIrK+XGcyIe8EDzBuRyKZgyWyjE2lD3BR352ehUZnVOFcGY5V1C3H2LV1D+S0Nr2C+4HHl0/WvsKIXbt0GFnHR1opmt0CVqjke6rPRNrH59ijSbR'
        )
        response = client.get("/me/videos")

        if response.status_code != 200:
            return

        videos = response.json().get("data")
        if videos is None:
            return

        for video in videos:
            resource_key = video["resource_key"]
            name = video["name"]
            embed = video["player_embed_url"]
            description = video["description"] if video["description"] else ""

            try:
                Video.objects.get(resource_key=resource_key)
            except ObjectDoesNotExist:
                video, created = Video.objects.get_or_create(
                    resource_key=resource_key,
                    name=name,
                    embed=embed,
                    description=description
                )
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f'Pomyslnie dodano nowe wideo {name}!'))

        self.stdout.write(self.style.SUCCESS('Pomyslnie zakonczono!'))
