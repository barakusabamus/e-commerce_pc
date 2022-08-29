from django.db import models


# Create your models here.
class Computer(models.Model):
    title = models.CharField(max_length=30, null=True)
    description = models.TextField(null=True)
    gpu = models.CharField(max_length=30, null=True)
    cpu = models.CharField(max_length=30, null=True)
    ram = models.CharField(max_length=30, null=True)
    mother_board = models.CharField(max_length=30, null=True)
    ssd = models.CharField(max_length=30, null=True, default='без SSD')
    hdd = models.CharField(max_length=30, null=True, default='без HDD')
    psu = models.CharField(max_length=30, null=True, )
    case = models.CharField(max_length=30, null=True)
    cooling = models.CharField(max_length=30, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title


class Photo(models.Model):
    computer = models.ForeignKey('Computer', null=True, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')
    is_active = models.BooleanField(default=False, null=True)
    is_main = models.BooleanField(default=False)


class Order(models.Model):
    computer = models.ForeignKey('Computer', on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField(null=True)
    phone = models.CharField(max_length=12, null=True)
    date = models.DateField(auto_now=True, null=True)