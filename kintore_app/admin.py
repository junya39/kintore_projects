from django.contrib import admin
from .models import TrainingLog, TrainingSet
# Register your models here.

admin.site.register(TrainingLog)
admin.site.register(TrainingSet)