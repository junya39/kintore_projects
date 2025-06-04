from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend  # これ必要
from .models import TrainingLog, TrainingSet
from .serializers import TrainingLogSerializer, TrainingSetSerializer

class TrainingLogViewSet(viewsets.ModelViewSet):
    queryset = TrainingLog.objects.all().order_by('-date')
    serializer_class = TrainingLogSerializer
    # フィルター不要ならこれごと削除してOK
    # filterset_fields = []

class TrainingSetViewSet(viewsets.ModelViewSet):
    queryset = TrainingSet.objects.all().order_by('-training_log')
    serializer_class = TrainingSetSerializer
    filter_backends = [DjangoFilterBackend]  # ← フィルター機能を使うよ！
    filterset_fields = ['training_log']  # ← モデルにある外部キーを指定！
