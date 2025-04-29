from rest_framework import viewsets
from .models import TrainingLog, TrainingSet
from .serializers import TrainingLogSerializer, TrainingSetSerializer

class TrainingLogViewSet(viewsets.ModelViewSet):
  queryset = TrainingLog.objects.all().order_by('-date')
  serializer_class = TrainingLogSerializer

class TrainingSetViewSet(viewsets.ModelViewSet):
  queryset = TrainingSet.objects.all().order_by('-training_log')
  serializer_class = TrainingSetSerializer