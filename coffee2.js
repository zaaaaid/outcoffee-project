let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}






if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready)
} else {
    ready()
}


function ready() {
     var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0 ; i<removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click' , removeCartItem)   
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0 ; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('fas fa-shopping-cart')
    for (var i = 0 ; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click' , addToCartClicked)
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', purchaseClicked)
}
function purchaseClicked () {
    alert('Thank You for you purchase')
    var cartItems = document.getElementsByClassName('sidebar')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked (event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title , price , imageSrc)
    updateCartTotal()
}

function addItemToCart(title , price , imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('sidebar')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0 ; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContent = `
    <div class="cart-column">
       <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
       <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
       <input class="cart-quantity-input" type="number" value="1">
       <button class="btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click' , removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change' , quantityChanged)
}


function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var carItemContainer = document.getElementsByClassName('sidebar')[0]
    var cartRows = carItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0 ; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₱' , ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total')[0].innerText = '₱' + total
}












