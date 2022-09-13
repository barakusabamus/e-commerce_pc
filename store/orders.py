from .models import Order, ProductInOrder, Computer
from json import loads


def create_order(request):
    # поиск товара и номера телефона
    items = [i for i in loads(request)[0:-1]]
    phone = loads(request)[-1]['phone']

    # создание нового объекта в БД
    order = Order.objects.create(phone=phone)

    order_total_price = 0

    # внесение каждого товара в БД
    for i in items:
        # поиск товара в БД всех товаров по его id
        id_computer = int(i['id'][3:])
        computer = Computer.objects.get(id=id_computer)

        # поиск кол-ва и цены товара
        quantity = int(i['quantity'])
        price = int(i['price'])

        # вычисление суммы товара
        item_total_price = quantity * price

        # добавление товара в БД
        ProductInOrder.objects.create(computer=computer, order=order,
                                      quantity=quantity, price=price,
                                      total_price=item_total_price)

        order_total_price += price * quantity

    # подсчет суммы заказа за все товары
    order.total_price = order_total_price
    order.save()
