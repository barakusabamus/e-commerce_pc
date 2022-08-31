from .models import Order, ProductInOrder, Computer
from json import loads


def create_order(request):
    items = [i for i in loads(request)[0:-1]]
    phone = loads(request)[-1]['phone']

    order = Order.objects.create(phone=phone)

    order_total_price = 0
    for i in items:
        id_computer = int(i['id'][3:])
        computer = Computer.objects.get(id=id_computer)

        quantity = int(i['quantity'])
        price = int(i['price'][:-4])
        item_total_price = quantity * price

        ProductInOrder.objects.create(computer=computer, order=order,
                                      quantity=quantity, price=price,
                                      total_price=item_total_price)

        order_total_price += price * quantity

    order.total_price = order_total_price
    order.save()
