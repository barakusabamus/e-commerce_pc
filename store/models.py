from django.db import models


# Create your models here.
class Computer(models.Model):
    title = models.CharField(max_length=30)
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
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    phone = models.CharField(max_length=12, null=True)
    time = models.DateTimeField(auto_now=True, null=True)


class ProductInOrder(models.Model):
    order = models.ForeignKey('Order', blank=True, null=True,  on_delete=models.CASCADE)
    computer = models.ForeignKey('Computer', blank=True, null=True,  on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
