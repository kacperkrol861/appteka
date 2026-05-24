from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RegisterView, CustomTokenObtainPairView, PatientListView

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")

urlpatterns = [

    path("token/", CustomTokenObtainPairView.as_view()),
    path("register/", RegisterView.as_view()),
    path("", include(router.urls)),
    path("users/", PatientListView.as_view()),
]