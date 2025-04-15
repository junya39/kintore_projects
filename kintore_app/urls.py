from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainingLogViewSet

router = DefaultRouter()
router.register(r'trainings', TrainingLogViewSet)

urlpatterns = [
 path('', include(router.urls)), 
]