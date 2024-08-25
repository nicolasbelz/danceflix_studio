from django.contrib import admin
from api.models import SubscriptionItem, Duration, Price, Video, UserVideo, Customer, Subscription, Organization, Region, City
# Register your models here., 

class OrganizationAdmin(admin.ModelAdmin):
    search_fields = ["id", 'name', 'city__name', 'category', 'phone_num', 'city__region__name']
    list_display = ("id", 'name', 'city', 'region', 'category', 'phone_num', 'contacted', 'status')
    

admin.site.register(Organization, OrganizationAdmin)
admin.site.register(SubscriptionItem)
admin.site.register(Duration)
admin.site.register(Price)
admin.site.register(Video)
admin.site.register(UserVideo)
admin.site.register(Customer)
admin.site.register(Region)
admin.site.register(City)
admin.site.register(Subscription)