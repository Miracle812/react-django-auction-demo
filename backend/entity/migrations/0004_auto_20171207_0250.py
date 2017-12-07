# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-07 02:50
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('entity', '0003_auto_20171207_0221'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='charities',
            field=models.ManyToManyField(to='entity.Charity'),
        ),
        migrations.AlterField(
            model_name='donor',
            name='charity',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='_charity', to='entity.Charity'),
        ),
    ]
