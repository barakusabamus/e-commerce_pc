from django.contrib import admin
from . import models


class ProductInOrderInline(admin.TabularInline):
    model = models.ProductInOrder
    extra = 0
    

class PhotoInline(admin.TabularInline):
    model = models.Photo
    extra = 0


class ComputerAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'gpu', 'cpu',)
    list_display_links = ('id', 'title', 'price', 'gpu', 'cpu',)
    inlines = [PhotoInline]


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'time')
    list_display_links = ('id', 'time')
    inlines = [ProductInOrderInline]


admin.site.register(models.Computer, ComputerAdmin)
admin.site.register(models.Photo)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.ProductInOrder)