from django.shortcuts import render, HttpResponse
from .models import Computer, Photo


# Create your views here.
def store(request):
    computers = Computer.objects.all()
    photos = Photo.objects.filter(is_main=True)
    return render(request, 'store/store.html', locals())


def display_computer(request, computer_id):
    computer = Computer.objects.get(id=computer_id)
    photos = Photo.objects.filter(computer=computer_id)
    return render(request, 'store/computer.html', locals())


def cart(request):
    return render(request, 'store/cart.html')
