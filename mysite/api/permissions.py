from email.errors import ObsoleteHeaderDefect
from rest_framework import permissions
from api.models import Customer
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User


class CustomerAccessPermission(permissions.BasePermission):
    message = 'Has a valid subscription.'

    def has_permission(self, request, view):
        try:
            customer = Customer.objects.get(user=request.user)
            return customer.active
        except ObjectDoesNotExist:
            return False
