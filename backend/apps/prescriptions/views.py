from rest_framework import viewsets, serializers
from .models import Prescription
from .serializers import PrescriptionSerializer
from .permissions import IsDoctor, IsPatient
from .services import update_expired_prescriptions
from rest_framework.permissions import BasePermission


class IsDoctorOrPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role in ["DOCTOR", "PATIENT"]
        )


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer

    def get_permissions(self):
        if self.action == "create":
            return [IsDoctor()]

        return [IsDoctorOrPatient()]  # 🔥 FIX TUTAJ

    def get_queryset(self):
        update_expired_prescriptions()

        user = self.request.user

        if user.role == "DOCTOR":
            return Prescription.objects.filter(doctor=user).order_by("-created_at")

        if user.role == "PATIENT":
            return Prescription.objects.filter(patient=user).order_by("-created_at")

        return Prescription.objects.none()

    def get_serializer_context(self):
        return {"request": self.request}

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