from rest_framework.routers import DefaultRouter
from .views import PrescriptionViewSet

router = DefaultRouter()
router.register(
    r'prescriptions',
    PrescriptionViewSet,
    basename='prescriptions'
)

urlpatterns = router.urls