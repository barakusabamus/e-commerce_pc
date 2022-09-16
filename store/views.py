from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Computer, Photo
from .orders import *


def store(request):
    computers = Computer.objects.all()
    photos = Photo.objects.filter(is_main=True, is_active=True)
    return render(request, 'store/store.html', locals())


def display_computer(request, computer_id):
    computer = Computer.objects.get(id=computer_id)
    photos = Photo.objects.filter(computer=computer_id, is_active=True)
    second_photos = photos.filter(is_main=False)
    main_photo = photos.get(is_main=True)
    return render(request, 'store/computer.html', locals())


def cart(request):
    return render(request, 'store/cart.html')


def checkout(request):
    if request.method == 'POST':
        if request.content_type == 'text/plain':
            create_order(request.body)

    return render(request, 'store/checkout.html', locals())


class DefiniteComputerAPIViews(APIView):
    def get(self, request, computer_id):
        definite_computer = Computer.objects.filter(id=computer_id).values()

        return Response(definite_computer)
