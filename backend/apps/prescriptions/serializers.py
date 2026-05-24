from rest_framework import serializers
from .models import Prescription, PrescriptionItem
from django.utils import timezone


class PrescriptionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionItem
        fields = ["medication", "dosage", "instructions"]


class PrescriptionSerializer(serializers.ModelSerializer):
    items = PrescriptionItemSerializer(many=True)

    class Meta:
        model = Prescription
        fields = [
            "id",
            "doctor",
            "patient",
            "created_at",
            "expires_at",
            "status",
            "items",
        ]
        read_only_fields = ["doctor", "created_at", "status"]

    def validate_expires_at(self, value):
        if value <= timezone.now().date():
            raise serializers.ValidationError(
                "Data ważności musi być w przyszłości"
            )
        return value

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError(
                "Recepta musi mieć przynajmniej 1 lek"
            )

        return items

    def create(self, validated_data):
        items_data = validated_data.pop("items")

        # doctor NIE tutaj!
        prescription = Prescription.objects.create(**validated_data)

        for item in items_data:
            PrescriptionItem.objects.create(
                prescription=prescription,
                **item
            )

        return prescription