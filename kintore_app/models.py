from django.db import models

# Create your models here.

class TrainingLog(models.Model):
  date = models.DateField()
  exercise = models.CharField(max_length=100)
  weight = models.FloatField()
  reps = models.IntegerField()
  sets = models.IntegerField()
  memo = models.TextField(blank=True)
  
  def __str__(self):
    return f"{self.date} - {self.exercise}"