from django.urls import path

from . import views

urlpatterns = [
    path('', views.store),
    path('computer/<int:computer_id>', views.display_computer),
    path('cart', views.cart),
    path('checkout', views.checkout),
    path('api/computers/<int:computer_id>', views.DefiniteComputerAPIViews.as_view())

]
