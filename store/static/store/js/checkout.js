// отправка номера телефона на сервер 

let cart = JSON.parse (localStorage.getItem ("cart")) || []

document.addEventListener('DOMContentLoaded', function(){
    
    let phoneInput = document.querySelectorAll('input[data-tel-input]')

    let getInputNumbersValue = function(input){
        return input.value.replace(/\D/g, '')
    }




 





    let onPhoneInput = function(event){
        let input = event.target,
            inputNumbersValue = getInputNumbersValue(input)

            // console.log(inputNumbersValue.length)

        if(!inputNumbersValue){
            return input.value = ''
        }
        // ру номер
        if (['7', '8', '9'].indexOf(inputNumbersValue[0]) >  -1){

            if(inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue
            let firstSymbols = (inputNumbersValue[0] == '8' ) ? ' 8' : '+7'
            formattedInputValue = firstSymbols  + ' '
            if(inputNumbersValue.length > 1){
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
            }

            if(inputNumbersValue.length >=  5){
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
            }

            if(inputNumbersValue.length >=  8){
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
            }

            if(inputNumbersValue.length >=  10){
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
            }

            
            

        }else {
            return input.value = '+' + inputNumbersValue,
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16)
        }
        input.value = formattedInputValue   
   }

   let onPhoneKeyDown = function(event){
        
    
    let input = event.target
        if (event.keyCode == 8 & getInputNumbersValue(input).length == 1){
            input.value = ""
            
        }
        
   }

    for (i=0; i<phoneInput.length; i++){
        let input = phoneInput[i]
        input.addEventListener('input', onPhoneInput)
        // console.log('func')
        input.addEventListener('keydown', onPhoneKeyDown)
        
        
    }
    
        // добавлени номера в Locak Storage
    function addPhoneInLocalStorage(phone) {

        const search = cart.find((x) => x.phone === phone )

        if (search === undefined){
            
            cart.push({
                'phone': phone
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart))

}



    // отправка POST запроса
    function checkoutPostRequest(event){
        const phone = (document.getElementById('phone').value).replace(/\D/g, '')
        

        // console.log(phone)

        if(phone[0] == 8 || phone[0] == 7){
            if(phone.length != 11 ){
                event.preventDefault()
                return
            }
        }

        // console.log(phone.replace(/\D/g, ''))
        // console.log(phone[1])
        
        // return
    
        
        const checkout = document.querySelector('.checkout > input')
        const csrf_token = checkout.getAttribute('value')
        
        addPhoneInLocalStorage(phone) 
  
       
        
        const url = 'http://127.0.0.1:8000/checkout'         
    
        
    
        fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token,
            },
            body:  localStorage.getItem ("cart")
        })
    
        // console.log('pupu')
       
        localStorage.clear()
    }
    
    

    // обработчик отправки формы 
    let form = document.querySelector('form')
    form.addEventListener('submit', checkoutPostRequest)
    
})
