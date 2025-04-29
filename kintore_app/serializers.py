from rest_framework import serializers
from .models import TrainingLog, TrainingSet

class TrainingLogSerializer(serializers.ModelSerializer):
  class Meta:
    model = TrainingLog
    fields ='__all__'
    
class TrainingSetSerializer(serializers.ModelSerializer):
  class Meta:
    model = TrainingSet
    fields = '__all__'