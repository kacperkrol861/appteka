from django.utils import timezone
from .models import Prescription


def update_expired_prescriptions():
    today = timezone.now().date()

    Prescription.objects.filter(
        status="ACTIVE",
        expires_at__lt=today
    ).update(status="EXPIRED")