# Generated by Django 3.0 on 2021-01-21 07:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20210121_1454'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gridmap',
            name='datetime_end',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 22, 14, 59, 9, 62160)),
        ),
        migrations.AlterField(
            model_name='gridmap',
            name='datetime_start',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 21, 14, 59, 9, 62160)),
        ),
        migrations.AlterField(
            model_name='heatmap',
            name='datetime_end',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 22, 14, 59, 9, 62160)),
        ),
        migrations.AlterField(
            model_name='heatmap',
            name='datetime_start',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 21, 14, 59, 9, 62160)),
        ),
    ]