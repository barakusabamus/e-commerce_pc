from django.shortcuts import render, HttpResponse
from json import loads

from .models import Computer, Photo, Order
from .forms import Checkout
from .cart import *


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


def checkout(request):
    # if request.method == 'POST':
    #     id_quantity = None
    #     # print(request.POST)
    #     if request.content_type == 'text/plain':
    #         items = [i for i in loads(request.body)]
    #         id_quantity = [{i['id']: i['quantity']} for i in items]
    #
    #     phone = request.POST.get('phone')
    #     print(phone)
    #     print(id_quantity)

    if request.method == 'POST':
        print(request.body)
        if request.content_type == 'text/plain':
            items = [i for i in loads(request.body)[0:-1]]
            id_quantity = [{i['id']: i['quantity']} for i in items]
            phone = loads(request.body)[-1]['phone']

            for i in items:
                id = int(i['id'][3:])
                computer = Computer.objects.get(id=id)
                quantity = int(i['quantity'])
                Order.objects.create(phone=phone, quantity=quantity, computer=computer)
                print(quantity, computer)

    return render(request, 'store/checkout.html', locals())
