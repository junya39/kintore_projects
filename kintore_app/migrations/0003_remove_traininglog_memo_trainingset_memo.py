# Generated by Django 5.2 on 2025-05-11 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kintore_app', '0002_remove_traininglog_reps_remove_traininglog_sets_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='traininglog',
            name='memo',
        ),
        migrations.AddField(
            model_name='trainingset',
            name='memo',
            field=models.TextField(blank=True),
        ),
    ]
