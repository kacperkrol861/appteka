from rest_framework import viewsets
from .models import Prescription
from .serializers import PrescriptionSerializer
from .permissions import IsDoctor, IsPatient


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer

    def get_permissions(self):
        if self.action == "create":
            return [IsDoctor()]
        return [IsDoctor() | IsPatient()]

    def get_queryset(self):
        user = self.request.user

        if user.role == "DOCTOR":
            return Prescription.objects.filter(doctor=user)

        if user.role == "PATIENT":
            return Prescription.objects.filter(patient=user)

        return Prescription.objects.none()

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)