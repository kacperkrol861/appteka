from django.db import models
from apps.users.models import User
from django.db import models
from apps.medications.models import Medication

class Prescription(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        USED = "USED", "Used"
        EXPIRED = "EXPIRED", "Expired"

    doctor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="issued_prescriptions"
    )

    patient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="received_prescriptions"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE
    )

    def __str__(self):
        return f"Rx #{self.id} - {self.patient}"



class PrescriptionItem(models.Model):
    prescription = models.ForeignKey(
        'Prescription',
        on_delete=models.CASCADE,
        related_name="items"
    )

    medication = models.ForeignKey(
        Medication,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    dosage = models.CharField(max_length=255)

    instructions = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.medication.name} x{self.quantity}"