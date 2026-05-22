from rest_framework import serializers
from .models import Prescription, PrescriptionItem
from apps.medications.models import Medication
from django.utils import timezone


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

    def validate_expires_at(self, value):
        if value <= timezone.now().date():
            raise serializers.ValidationError(
                "Data ważności musi być w przyszłości"
            )
        return value

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("Recepta musi mieć przynajmniej 1 lek")

        for item in items:
            if item.get("quantity", 0) <= 0:
                raise serializers.ValidationError("Ilość leku musi być > 0")

        return items

    def get_serializer_context(self):
        return {"request": self.request}