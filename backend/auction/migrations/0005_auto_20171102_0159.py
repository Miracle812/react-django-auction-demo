# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-02 01:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('entity', '0002_auto_20171027_1502'),
        ('auction', '0004_auction_open_until'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sent_at', models.DateTimeField()),
                ('arrived_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('tracking_number', models.CharField(max_length=100)),
                ('status', models.CharField(choices=[('waiting-to-ship', 'Waiting'), ('shipping', 'Shipping'), ('returning', 'Returning'), ('arrived', 'Arrived'), ('cancelled', 'Cancelled')], default='waiting-to-ship', max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='auction',
            name='status',
            field=models.CharField(choices=[('preview', 'Preview'), ('open', 'Open'), ('cancelled', 'Cancelled'), ('cancelled-no-bids', 'Cancelled due to no bids'), ('waiting-for-payment', 'Waiting for payment'), ('waiting-to-ship', 'Waiting to ship'), ('shipped', 'Shipped'), ('finished', 'Finished')], default='preview', max_length=50),
        ),
        migrations.AddField(
            model_name='shipment',
            name='auction',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='auction.Auction'),
        ),
        migrations.AddField(
            model_name='shipment',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entity.Product'),
        ),
    ]