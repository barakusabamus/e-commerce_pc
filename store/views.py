from django.shortcuts import render, HttpResponse
from .models import Computer, Photo


# Create your views here.
def store(request):
    computers = Computer.objects.all()
    photos = Photo.objects.filter(is_main=True)
    return render(request, 'store/store.html', locals())
