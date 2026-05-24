from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "pesel",
            "password",
            "role",
        ]

    def create(self, validated_data):
        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            pesel=validated_data["pesel"],
            role=validated_data["role"],
        )

        user.set_password(validated_data["password"])
        user.save()

        return user

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "username": instance.username,
            "first_name": instance.first_name,
            "last_name": instance.last_name,
        }

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "role": self.user.role,
        }

        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "pesel",
            "role",
        ]