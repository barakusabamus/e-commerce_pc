from django.shortcuts import render, HttpResponse
from .models import Computer


# Create your views here.
def store(request):
    computers = Computer.objects.all()

    return render(request, 'store/store.html', locals())
