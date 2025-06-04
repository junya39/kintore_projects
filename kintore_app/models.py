from django.db import models

# Create your models here.

class TrainingLog(models.Model):
  date = models.DateField()
  exercise = models.CharField(max_length=100)
  
class TrainingSet(models.Model):
  training_log = models.ForeignKey(TrainingLog, related_name="sets", on_delete=models.CASCADE)
  sets = models.IntegerField()
  weight = models.FloatField()
  reps = models.IntegerField()
  memo = models.TextField(blank=True)
  
  
  def __str__(self):
    return f"{self.training_log.date} - {self.training_log.exercise} : {self.weight}kg x {self.reps}回 x {self.sets}セット"