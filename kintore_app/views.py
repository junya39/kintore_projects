from rest_framework import viewsets
from .models import TrainingLog
from .serializers import TrainingLogSerializer

class TrainingLogViewSet(viewsets.ModelViewSet):
  queryset = TrainingLog.objects.all().order_by('-date')
  serializer_class = TrainingLogSerializer