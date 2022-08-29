from django.contrib import admin
from . import models


class PhotoInline(admin.TabularInline):
    model = models.Photo


class ComputeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'gpu', 'cpu',)
    list_display_links = ('id', 'title', 'price', 'gpu', 'cpu',)
    inlines = [PhotoInline]


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'date')


admin.site.register(models.Computer, ComputeAdmin)
admin.site.register(models.Photo)
admin.site.register(models.Order, OrderAdmin)
