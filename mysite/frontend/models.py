from django.db import models

# Create your models here.
# from django.db import models

# # Create your models here.


# class TextField(models.Model):
#     slug = models.SlugField(max_length=20)
#     text = models.TextField(blank=True)

#     def __str__(self) -> str:
#         return self.slug


# class Email(models.Model):
#     slug = models.SlugField(max_length=20)
#     text = models.TextField(blank=True)

#     def __str__(self) -> str:
#         return self.slug


# class Counter(models.Model):
#     count = models.IntegerField(default=0)


# class Playlist(models.Model):
#     playlist_index = models.IntegerField(blank=True, null=True)
#     name = models.CharField(max_length=70)
#     image = models.CharField(max_length=30, blank=True, null=True)
#     description = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return self.name

