from django.db import models
from apps.users.models import User


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pesel = models.CharField(max_length=11, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Patient: {self.user.username}"