from django.db import models


# Create your models here.
class Computer(models.Model):
    title = models.CharField(max_length=30, null=True)
    description = models.TimeField(null=True)
    gpu = models.CharField(max_length=30, null=True)
    cpu = models.CharField(max_length=30, null=True)
    ram = models.CharField(max_length=30, null=True)
    mother_board = models.CharField(max_length=30, null=True)
    ssd = models.CharField(max_length=30, null=True)
    hdd = models.CharField(max_length=30, null=True)
    psu = models.CharField(max_length=30, null=True)
    case = models.CharField(max_length=30, null=True)
    cooling = models.CharField(max_length=30, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
