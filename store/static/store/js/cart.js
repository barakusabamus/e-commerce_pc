const cartItem = document.querySelector('.cart-item')

let cart = JSON.parse(localStorage.getItem("cart")) || []


// добваление товара в корзину
window.addEventListener('click', async function (event) {
    if (event.target.hasAttribute('type')) {

        const card = event.target.closest('.shop-item')

        const search = cart.find((x) => x.id === card.dataset.id)

        // если товара нет в корзине, запросить данный с сервера
        if (search === undefined) {

            let productId = ''

            for (let char of card.dataset.id) {
                if (char != 'i' && char != 'd' && char != '-') {

                    productId = productId + char
                }
            }

            url = `/api/computers/${productId}`

            let res = await fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    let info = {
                        'price': data[0]['price'],
                        'id': data[0]['id'],
                        'title': data[0]['title']
                    }

                    return info

                })



            cart.push({
                id: `id-${res['id']}`,
                imgSrc: card.querySelector('.shop-item-image').getAttribute('src'),
                title: res['title'],
                price: res['price'],
                quantity: 1
            })

        } else {
            search.quantity += 1
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        // sessionStorage.setItem('cart', JSON.stringify(cart) )

    }


})

// отрисоавка товара в корзине
function showCart() {


    for (i in cart) {
        if (parseInt(cart[i].quantity) != 0 & cart[i].id != undefined) {

            const cartItemHTML = `
                <div data-id="${cart[i].id}" class="card rounded-3 mb-4 item-cart">
                        <div class="card-body p-4 item data-id="${cart[i].id}"">
                          <div class="row d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                              <img src="/photos/photos/2022/09/09/dragon-1-600x600.jpeg" style="margin-left: 0px ;" class="img-fluid rounded-3" >
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                              <p class="lead fw-normal mb-2">${cart[i].title}</p>
                              
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button class="minus btn" data-id="${cart[i].id}">-</button>
              
                              <h2 class="quantity">${cart[i].quantity}</h2>
              
                              <button class="plus btn"  data-id="${cart[i].id}">+</button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h5 class="mb-0 cart-price">${parseInt(cart[i].price) * parseInt(cart[i].quantity)} ₽</h5>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button class="remove btn" data-id="${cart[i].id}" >❌</button>
                            </div>
                          </div>
                        </div>
                      </div>
                `


            cartItem.insertAdjacentHTML('beforeend', cartItemHTML)


        }
    }
}


// обработка нажатий на товар в корзине
document.onclick = event => {

    if (event.target.closest('.remove')) {
        remove(event)
    } else if (event.target.closest('.plus')) {
        plus(event)

    } else if (event.target.closest('.minus')) {
        minus(event)

    } else if (event.target.closest('.input-checkout')) {
    }
}

// удаление товара в корзине
function remove(event) {
    removeBtn = event.target.closest('.remove')
    const cartItem = event.target.closest('.item-cart')

    const search = cart.find((x) => x.id === removeBtn.dataset.id)

    search.quantity = 0
    localStorage.setItem('cart', JSON.stringify(cart))

    cartItem.remove()
    displayCheckoutButton()
}

// увеличение товара в корзине
function plus(event) {


    const plusBtn = event.target.closest('.plus')
    const quantity = cartItem.querySelector(`[data-id="${plusBtn.dataset.id}"]`).querySelector('.quantity')

    const search = cart.find((x) => x.id === plusBtn.dataset.id)

    search.quantity++

    localStorage.setItem('cart', JSON.stringify(cart))

    quantity.innerHTML = search.quantity

    calculete(plusBtn.dataset.id)


}

// уменьшение товара в корзине
function minus(event) {


    const minusBtn = event.target.closest('.minus')
    const quantity = cartItem.querySelector(`[data-id="${minusBtn.dataset.id}"]`).querySelector('.quantity')

    const search = cart.find((x) => x.id === minusBtn.dataset.id)

    if (search.quantity > 1) {
        search.quantity--
        quantity.innerHTML = search.quantity


    }

    localStorage.setItem('cart', JSON.stringify(cart))

    calculete(minusBtn.dataset.id)

}

// отрисовка изименений кол-во товара в корзине
function calculete(id) {

    const price = cartItem.querySelector(`[data-id="${id}"]`).querySelector('.cart-price')

    const search = cart.find((x) => x.id === id)

    price.innerHTML = ` ${parseInt(search.quantity) * parseInt(search.price)} ₽`


}


function displayCheckoutButton() {
    const checkoutWrapper = document.querySelector('.wrapper-checkout_button')
    const buttonCheckoutHTML = `<a href="/checkout"><button class="btn_cart btn">оформить</button></a>`
    const buttonCheckout = checkoutWrapper.querySelector('.btn_cart ')

    let quantity = 0

    for (i in cart) {
        if (parseInt(cart[i].quantity) != 0 & cart[i].id != undefined) {
            quantity++
        }
    }


    if (quantity > 0 & buttonCheckout == null) {
        checkoutWrapper.insertAdjacentHTML('beforeend', buttonCheckoutHTML)
    } else if (quantity == 0) {
        buttonCheckout.remove()
        // console.log('корзина пуста')
    }


}


if (cartItem) {
    showCart()
    displayCheckoutButton()
}




   









