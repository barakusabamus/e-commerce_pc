from django.contrib import admin
from . import models


class PhotoInline(admin.TabularInline):
    model = models.Photo


class ComputeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'gpu', 'cpu', 'price', )
    list_display_links = ('id', 'title', 'gpu', 'cpu', 'price',)
    inlines = [PhotoInline]


admin.site.register(models.Computer, ComputeAdmin)
admin.site.register(models.Photo)
