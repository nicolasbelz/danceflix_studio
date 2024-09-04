from django.test import TestCase, Client
import unittest
from django.urls import reverse
from django.contrib.auth.models import User
from api.models import Video, SubscriptionItem, Duration, Price, Subscription, UserVideo, Customer
from io import StringIO
from django.core.management import call_command
import requests
import urllib3
import json

urllib3.disable_warnings()

URL = "http://www.danceflix.pl"


class TestValidateSubscription(TestCase):
    def call_validateSubscriptions(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "validateSubscriptions",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_loadSubscriptions(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "loadSubscriptions",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_loadDatabase(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "loadDatabase",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def test_dry_run(self):
        self.call_loadDatabase()

        SubscriptionItem.objects.create(
            duration=Duration.objects.create(days=30, time="1 miesiac"),
            price=Price.objects.create(amount=20.0, currency="PLN")
        )

        self.call_loadSubscriptions()

        self.call_validateSubscriptions()

        for user in User.objects.all():
            self.assertLess(
                len(Subscription.objects.filter(user=user, paid=True)), 2)


class TestGetAllVideos(TestCase):

    def call_get_all_videos(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "get_all_videos",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def test_dry_run(self):
        self.assertEqual(len(Video.objects.all()), 0)
        self.call_get_all_videos()
        self.assertGreater(len(Video.objects.all()), 5)


class TestUpdateIndexes(TestCase):

    def call_get_all_videos(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "get_all_videos",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_validateSubscriptions(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "validateSubscriptions",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_loadSubscriptions(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "loadSubscriptions",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_loadDatabase(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "loadDatabase",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_updateIndexes(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "updateIndexes",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def call_updateUserVideos(self, *args, **kwargs):
        out = StringIO()
        call_command(
            "updateUserVideos",
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs,
        )
        return out.getvalue()

    def setUp(self):

        SubscriptionItem.objects.create(
            duration=Duration.objects.create(days=30, time="1 miesiac"),
            price=Price.objects.create(amount=20.0, currency="PLN")
        )
        self.call_loadDatabase()
        self.call_loadSubscriptions()
        self.call_validateSubscriptions()
        self.call_get_all_videos()

    def test_dry_run(self):

        for user in User.objects.all():
            userVideos = UserVideo.objects.filter(user=user)
            self.assertEqual(len(userVideos), 0)

        for index, video in enumerate(Video.objects.all()):
            video.index = index
            video.save()

        self.call_updateUserVideos()

        for user in User.objects.all():
            customer = Customer.objects.get(user=user)
            if customer.active:
                userVideos = UserVideo.objects.filter(user=user)
                self.assertEqual(len(userVideos), customer.video_index)


class TestGetHomepageVideo(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        credentials = {
            "username": "username",
            "email": "example@email.com",
            "password": "password"
        }
        self.my_user = User.objects.create_user(**credentials)
        response = self.client.post("/auth/login/", credentials)

        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIn("access_token", data.keys())
        self.access_token = data["access_token"]
        self.get_url = reverse("get-homepage-video")

        self.video = Video.objects.create(
            resource_key="testtest",
            name="Lekcja 1",
            embed="https://player.vimeo.com/video/gsh?h=c39426fbcc",
            free=True,
            index=1
        )

    def test_GET(self):
        response = self.client.get(self.get_url)

        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIn("resource_key", data.keys())
        self.assertEqual(data["resource_key"], self.video.resource_key)


class TestGetVideos(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        credentials = {
            "username": "username",
            "email": "example@email.com",
            "password": "password"
        }
        self.my_user = User.objects.create_user(**credentials)
        response = self.client.post("/auth/login/", credentials)

        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIn("access_token", data.keys())
        self.access_token = data["access_token"]
        self.get_url = reverse("get-videos")
        videos = [
        Video.objects.create(resource_key="3", name="3", embed="www", index=3),
        Video.objects.create(resource_key="1", name="1", embed="www", index=1),
        Video.objects.create(resource_key="4", name="4", embed="www", index=4),
        Video.objects.create(resource_key="2", name="2", embed="www", index=2)]

        Customer.objects.create(user=self.my_user, phone="123123123", video_index=5)
        subscription_item = SubscriptionItem.objects.create(
            duration=Duration.objects.create(days=30, time="1 miesiac"),
            price=Price.objects.create(amount=20.0, currency="PLN")
        )

        Subscription.objects.create(subscription_item=subscription_item, paid=True, user=self.my_user)


        for i in range(4):
            UserVideo.objects.create(video=videos[i], user=self.my_user)
        
    def test_get(self):
        response = self.client.get(self.get_url, headers={"Content-type": "application/json", "Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)



class TestGetSubscriptionItems(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        credentials = {
            "username": "username",
            "email": "example@email.com",
            "password": "password"
        }
        self.my_user = User.objects.create_user(**credentials)
        response = self.client.post("/auth/login/", credentials)

        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIn("access_token", data.keys())
        self.access_token = data["access_token"]
        self.get_url = reverse("offers")

        self.item = SubscriptionItem.objects.create(
            duration=Duration.objects.create(days=30, time="1 miesiac"),
            price=Price.objects.create(amount=20.0, currency="PLN"),
        )

    def test_GET(self):
        response = self.client.get(self.get_url)

        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIsInstance(data, list)
        self.assertIn("price", data[0])
        self.assertEqual(data[0]["price"]["amount"], self.item.price.amount)


class TestCheckout(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        credentials = {
            "username": "username",
            "email": "example@email.com",
            "password": "password"
        }
        self.my_user = User.objects.create_user(**credentials)
        Customer.objects.create(
            user=self.my_user,
            phone="123123123",
            stripe_customer_id="testtest"
        )

        response = self.client.post("/auth/login/", credentials)

        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIn("access_token", data.keys())
        self.access_token = data["access_token"]
        self.post_url = reverse("checkout")

        self.item = SubscriptionItem.objects.create(
            duration=Duration.objects.create(days=30, time="1 miesiac"),
            price=Price.objects.create(amount=20.0, currency="PLN"),
            stripe_price_id="tetstets"
        )

    def test_success(self):
        data = {
            "duration": 30,
            "currency": "PLN",
            "city": "Krakow",
            "postal_code": "31-572",
            "first_name": "Dominik",
            "last_name": "Matracki",
            "address": "Dabska 18g"
        }
        # TODO - uncomment when got id
        response = self.client.post(self.post_url, data=data, headers={"Content-type": "application/json", "Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("url", data.keys())


class TestRealApiNewUser(unittest.TestCase):

    def setUp(self) -> None:
        credentials = {
            "email": "test@gmail.com",
            "password": "1234mat"
        }

        response = requests.post(f"{URL}/auth/login/", data=credentials)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        token = data["access_token"]

        self.headers = {
            "Content-type": "application/json",
            "Authorization": f"Bearer {token}"
        }

    def test_get_homepage_video(self):
        response = requests.get(
            f"{URL}/api/get-homepage-video/",
            verify=False)  # Not a good way bu
        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIsInstance(data, dict)
        self.assertIn("resource_key", data.keys())
        self.assertIn("embed", data.keys())
        self.assertIn("name", data.keys())

    def test_get_homepage_video_auth(self):
        response = requests.get(
            f"{URL}/api/get-homepage-video/",
            verify=False,
            headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIsInstance(data, dict)
        self.assertIn("resource_key", data.keys())
        self.assertIn("embed", data.keys())
        self.assertIn("name", data.keys())

    def test_checkout(self):
        data = {
            "duration": 30,
            "currency": "PLN",
            "city": "Krakow",
            "postal_code": "31-572",
            "first_name": "Dominik",
            "last_name": "Matracki",
            "address": "Dabska 18g"
        }

        encoder = json.JSONEncoder()
        response = requests.post(f"{URL}/api/checkout/", headers=self.headers, data=encoder.encode(data), verify=False)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("url", data.keys())


class TestRealApiActiveUser(unittest.TestCase):

    def setUp(self) -> None:
        credentials = {
            "email": "active_test@gmail.com",
            "password": "123123"
        }

        response = requests.post(f"{URL}/auth/login/", data=credentials)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        token = data["access_token"]

        self.headers = {
            "Content-type": "application/json",
            "Authorization": f"Bearer {token}"
        }
    
    def test_get_videos(self):

        response = requests.get(f"{URL}/api/get-videos/", headers=self.headers, verify=False)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 2)

        for video in data:
            self.assertIn("resource_key", video.keys())

            response = requests.get(f"{URL}/api/video/{video['resource_key']}", headers=self.headers, verify=False)
            self.assertEqual(response.status_code, 200)
            video_data = response.json()
            self.assertIn("embed", video_data.keys())


    def test_last_user_subscriptions(self):
        response = requests.get(f"{URL}/api/last-user-subs/", headers=self.headers, verify=False)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 1)
