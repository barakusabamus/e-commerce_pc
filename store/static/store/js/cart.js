const cartItem = document.querySelector('.cart-item')

let cart = JSON.parse (localStorage.getItem ("cart")) || []

// добваление товара в корзину
window.addEventListener('click', function(event) {
    if(event.target.hasAttribute('type')) {
        
        const card = event.target.closest('.shop-item')

        const search = cart.find((x) => x.id === card.dataset.id)

        if(search === undefined ){

            cart.push({
                id : card.dataset.id,
                imgSrc : card.querySelector('.shop-item-image').getAttribute('src'),
                title : card.querySelector('.name_pc').innerText,
                price : card.querySelector('.price').innerText,
                quantity : 1
            })   

        }
        else{    
            search.quantity += 1
        }
        
        localStorage.setItem ('cart', JSON.stringify(cart))
        // sessionStorage.setItem('cart', JSON.stringify(cart) )
      
    }


})
// отрисоавка корзины 
function showCart(){
    

        for(i in cart){
            if(parseInt(cart[i].quantity) != 0 & cart[i].id != undefined){


                const cartItemHTML = `
                    <div data-id="${cart[i].id}" class="item-cart">  
                        <div class="item" data-id="${cart[i].id}">
                            <img class="cart-item-image" src="${cart[i].imgSrc}" width="100" height="100">
                            <h3  >${cart[i].title}</h3>
                        </div>
                    
                        <div  class="cart-quantity-item" >
                        <button class="minus btn" data-id="${cart[i].id}" >-</button> 
                       
                            <h2 class="quantity" >${cart[i].quantity}</h2>
                    <!--        <input  type="text" class="quantity" placeholder inputmode="numeric" min="1" size="2" value="${cart[i].quantity}"  > -->
                        <button class="plus btn" data-id="${cart[i].id}" >+</button> 
                        </div>
                    
                        <h3 class="cart-price">${ parseInt(cart[i].price) * parseInt(cart[i].quantity)  } ₽</h3>

                        <button class="remove btn" data-id="${cart[i].id}" >❌</button>

                    </div>
                    `

                cartItem.insertAdjacentHTML('beforeend', cartItemHTML )

            }
        }
    }





// обработка нажатий на товар в корзине 
document.onclick = event => {

    if(event.target.closest('.remove')){
        remove(event)
    } else if(event.target.closest('.plus')){
        plus(event)

    } else if(event.target.closest('.minus')){
        minus(event)
    
    }else if(event.target.closest('.input-checkout')){   
    }
}

// удаление товара в корзине
function remove(event){
    removeBtn = event.target.closest('.remove')
    const cartItem  = event.target.closest('.item-cart')

    const search = cart.find((x) => x.id === removeBtn.dataset.id)

    search.quantity = 0
    localStorage.setItem ('cart', JSON.stringify(cart))

    cartItem.remove()
    displayCheckoutButton()
}

// увеличение товара в корзине
function plus(event){
    
    
    const plusBtn = event.target.closest('.plus')
    const quantity = cartItem.querySelector(`[data-id="${plusBtn.dataset.id}"]`).querySelector('.quantity')

    const search = cart.find((x) => x.id === plusBtn.dataset.id )

    search.quantity++

    localStorage.setItem('cart', JSON.stringify(cart))

    quantity.innerHTML = search.quantity

    calculete(plusBtn.dataset.id)
   

}
// уменьшение товара в корзине
function minus(event){
    
    
    const minusBtn = event.target.closest('.minus')
    const quantity = cartItem.querySelector(`[data-id="${minusBtn.dataset.id}"]`).querySelector('.quantity')

    const search = cart.find((x) => x.id === minusBtn.dataset.id )

    if(search.quantity > 1 ){
        search.quantity--
        quantity.innerHTML = search.quantity
        
        
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    calculete(minusBtn.dataset.id)

}

// отрисовка изименений кол-во товара в корзине
function calculete(id){

    const price = cartItem.querySelector(`[data-id="${id}"]`).querySelector('.cart-price')

    const search = cart.find((x) => x.id === id )

    price.innerHTML =` ${parseInt(search.quantity) * parseInt(search.price)} ₽`

    

}


function displayCheckoutButton(){
    const checkoutWrapper = document.querySelector('.wrapper-checkout_button')
    const buttonCheckoutHTML = `<a href="/checkout"><button class="btn_cart btn">оформить</button></a>`
    const buttonCheckout = checkoutWrapper.querySelector('.btn_cart ')

    let quantity = 0

    for(i in cart){
        if(parseInt(cart[i].quantity) != 0 & cart[i].id != undefined){
            quantity++
        }}


    if (quantity > 0 & buttonCheckout == null ){
        checkoutWrapper.insertAdjacentHTML('beforeend', buttonCheckoutHTML )
    }else if ( quantity == 0 ){
        buttonCheckout.remove()
        console.log('корзина пуста')
    }

    
    
}


if(cartItem){
    showCart()
    displayCheckoutButton()
}




   









