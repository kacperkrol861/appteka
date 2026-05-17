from django.db import models
from apps.users.models import User


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50)

    def __str__(self):
        return f"Dr {self.user.username}"