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

const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const success = document.querySelector('#success');
const errorNodes = document.querySelectorAll('.error');


function validateForm(){
    clearMessages();
    let errorFlag = false;


   if (nameInput.value.length < 1){
    errorNodes[0].innerText = "Name cannot be blank";
    nameInput.classList.add(".error-border");
    errorFlag = true;
   }

   if (!emailIsValid(email.value)){
    errorNodes[1].innerText = "invalid email address";
    email.classList.add(".error-border");
    errorFlag = true;
   }

   if (number.value.length < 1){
    errorNodes[2].innerText = "invalid number";
    number.classList.add(".error-border");
    errorFlag = true;
   }
   if(!errorFlag){
    success.innerText = "Message Sent!";
   }
}

function clearMessages(){

    for(let i = 0; i <errorNodes.length; i++){
        errorNodes[i].innerText = "";

    }
    nameInput.classList.remove('.error');
    email.classList.remove('.error')
    number.classList.remove('.error')
}

function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}
