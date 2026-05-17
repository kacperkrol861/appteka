from django.db import models


class Medication(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    dosage_info = models.CharField(max_length=255)

    def __str__(self):
        return self.name