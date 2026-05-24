from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets
from .models import User
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer
)
from rest_framework.filters import SearchFilter


# =========================
# LOGIN (JWT + USER + ROLE)
# =========================
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# =========================
# REGISTER
# =========================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# =========================
# USERS SEARCH (DLA LEKARZA)
# =========================
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ["first_name", "last_name", "username", "pesel"]

    def get_queryset(self):
        base = User.objects.filter(role="PATIENT")

        search = self.request.query_params.get("search")

        if search:
            return base.filter(
                first_name__icontains=search
            ) | base.filter(
                last_name__icontains=search
            ) | base.filter(
                username__icontains=search
            ) | base.filter(
                pesel__icontains=search
            )

        return base

from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class PatientListView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(role="PATIENT")