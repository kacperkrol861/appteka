from rest_framework import serializers
from .models import Prescription, PrescriptionItem
from apps.medications.models import Medication


class PrescriptionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionItem
        fields = ['medication', 'dosage', 'instructions']


class PrescriptionSerializer(serializers.ModelSerializer):
    items = PrescriptionItemSerializer(many=True)

    class Meta:
        model = Prescription
        fields = ['id', 'doctor', 'patient', 'created_at', 'expires_at', 'status', 'items']
        read_only_fields = ['doctor', 'created_at', 'status']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user

        # automatycznie ustawiamy lekarza
        prescription = Prescription.objects.create(
            doctor=user,
            **validated_data
        )

        # tworzymy leki w recepcie
        for item in items_data:
            PrescriptionItem.objects.create(
                prescription=prescription,
                **item
            )

        return prescription

    def get_serializer_context(self):
        return {"request": self.request}