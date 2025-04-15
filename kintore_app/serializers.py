from rest_framework import serializers
from .models import TrainingLog

class TrainingLogSerializer(serializers.ModelSerializer):
  class Meta:
    model = TrainingLog
    fields ='__all__'