from rest_framework import viewsets
from .models import Prescription
from .serializers import PrescriptionSerializer
from .permissions import IsDoctor, IsPatient
from rest_framework import serializers
from .services import update_expired_prescriptions
class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer

    def get_permissions(self):
        if self.action == "create":
            return [IsDoctor()]
        return [IsDoctor() | IsPatient()]

    def get_queryset(self):
        update_expired_prescriptions()

        user = self.request.user

        if user.role == "DOCTOR":
            return Prescription.objects.filter(doctor=user)

        if user.role == "PATIENT":
            return Prescription.objects.filter(patient=user)

        return Prescription.objects.none()

    def perform_create(self, serializer):
        patient = serializer.validated_data["patient"]

        active_count = Prescription.objects.filter(
            patient=patient,
            status="ACTIVE"
        ).count()

        if active_count >= 5:
            raise serializers.ValidationError(
                "Pacjent ma za dużo aktywnych recept (max 5)"
            )

        serializer.save(doctor=self.request.user)