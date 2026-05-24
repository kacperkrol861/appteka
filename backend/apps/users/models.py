import random

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        PATIENT = "PATIENT", "Patient"
        DOCTOR = "DOCTOR", "Doctor"
        ADMIN = "ADMIN", "Admin"

    role = models.CharField(
        max_length=20,
        choices=Role.choices
    )

    pesel = models.CharField(
        max_length=11,
        unique=True
    )

    @staticmethod
    def generate_username(first_name, last_name):
        first = first_name[:3].lower()
        last = last_name[:3].lower()

        while True:
            random_numbers = random.randint(10, 99)

            username = f"{first}{last}{random_numbers}"

            if not User.objects.filter(username=username).exists():
                return username

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.generate_username(
                self.first_name,
                self.last_name
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"