# Generated by Django 2.2.13 on 2021-03-04 19:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='posted_date',
            field=models.DateField(verbose_name=datetime.date(2021, 3, 4)),
        ),
    ]
