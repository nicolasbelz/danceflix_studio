from django.urls import path
from api.views import SubscriptionItemListView, GetVideosListView, GetVideoView, RegisterView, CheckoutView, PaymentProcessing, LastUserSubscriptions, GetCurrentSubscription, GetHomepageVideo


urlpatterns = [
    path(
        'offers/',
        SubscriptionItemListView.as_view(),
        name="offers"),
    path(
        'video/<str:resource_key>/',
        GetVideoView.as_view(),
        name="get-video"),
    path(
        'register/',
        RegisterView.as_view(),
        name="register"),
    path(
        'get-videos/',
        GetVideosListView.as_view(),
        name="get-videos"),
    path(
        'checkout/',
        CheckoutView.as_view(),
        name="checkout"),
    path(
        'last-user-subs/',
        LastUserSubscriptions.as_view(),
        name="last-subs"),
    path(
        'payment-processing/<str:session_id>/',
        PaymentProcessing.as_view(),
        name="payment"),
    path(
        'get-current-subscription/',
        GetCurrentSubscription.as_view(),
        name="get-auto-renewal"),
    path(
        'get-homepage-video/',
        GetHomepageVideo.as_view(),
        name="get-homepage-video"),
]
