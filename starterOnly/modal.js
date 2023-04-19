function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const boutonX = document.querySelector('.close');
const modalBtn = document.querySelectorAll(".modal-btn");
const submitBtn = document.querySelector(".btn-submit");
const form = document.getElementById("form");
const formData = document.querySelectorAll(".formData");
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const radioBtns = document.querySelectorAll('input[name="location"]');
const termGeneral = document.getElementById('checkbox1');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch close bouton-x
boutonX.addEventListener('click',closeModal);
// launch submission event
form.addEventListener("submit",validate,false);

const errorMessages={
  firstName:'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
  lastName:'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  email:'Veuillez entrer votre adress e-mail.',
  birthdate:'Veuillez entrer votre date de naissance.',
  quantity:'Vous devez choisir une option',
  radioBtns:'Vous devez choisir une option.',
  termGeneral:'Vous devez vérifier que vous acceptez les termes et conditions.'
}


firstName.addEventListener('input',(e)=>messageVisibility(e.target,isValidUserName(e.target),errorMessages.firstName),false);

lastName.addEventListener('input',(e)=>messageVisibility(e.target,isValidUserName(e.target),errorMessages.lastName),false);

email.addEventListener('input',(e)=>messageVisibility(e.target,isValidEmail(e.target),errorMessages.email),false);

birthdate.addEventListener('input',(e)=>messageVisibility(e.target,isFilled(e.target),errorMessages.birthdate),false);

quantity.addEventListener('input',(e)=>messageVisibility(e.target,isFilled(e.target),errorMessages.quantity),false);

radioBtns.forEach((ele)=>{ele.addEventListener('click',(e)=>messageVisibility(e.target,isChecked(e.target),errorMessages.radioBtns),false)});

termGeneral.addEventListener('click',(e)=>messageVisibility(e.target,isChecked(e.target),errorMessages.termGeneral),false);


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal form
function closeModal() {
  modalbg.style.display = "none";
}


// launch form validation

function validate(e){
  const conditions = isValidUserName(firstName)&&isValidUserName(lastName)&&isValidEmail(email)&&isFilled(birthdate)&&isFilled(quantity)&&isRequired(radioBtns)&&isChecked(termGeneral);

  if(!conditions){
    e.preventDefault();
    messageVisibility(firstName,isValidUserName(firstName),errorMessages.firstName);
    messageVisibility(lastName,isValidUserName(lastName),errorMessages.lastName);
    messageVisibility(email,isValidEmail(email),errorMessages.email);
    messageVisibility(birthdate,isFilled(birthdate),errorMessages.birthdate);
    messageVisibility(quantity,isFilled(quantity),errorMessages.quantity);
    messageVisibility(radioBtns[1],isRequired(radioBtns),errorMessages.radioBtns);
    messageVisibility(termGeneral,isChecked(termGeneral),errorMessages.termGeneral);

  }else{
    alert('hello');
  }

}


// check input and show the equivalent messages
function messageVisibility(ele,condition,message){
  if(!condition){
    showErrorMessage(ele,message);
  }else{
    removeErrorMessage(ele);
  }
}

// show error message
function showErrorMessage(ele,message){
  const parentDiv = ele.parentNode; // get the div containing the element
  parentDiv.setAttribute("data-error",message);
  parentDiv.setAttribute("data-error-visible","true");
}
// hide error message
function removeErrorMessage(ele){
  ele.parentNode.removeAttribute("data-error");
  ele.parentNode.removeAttribute("data-error-visible");
}


// function to check condition of inputs
function isValidUserName(ele){
  const str = ele.value;
  if(!str.replace(/\s/g,'').length||str.length<2){
    return false;
  }else{
    return true;
  }
}

function isValidEmail(ele){
  const emailRegex = /^[\w-\.]+@([\w-]+\.)[\w-]{2,4}$/;
  if(emailRegex.test(ele.value)){
    return true;
  }else{
    return false;
  }
}

function isFilled(ele){
  if(ele.value!=''){
    return true;
  }else{
    return false;
  }
}

function isRequired(btnRadios){
  for(const btnRadio of btnRadios){
    if(btnRadio.checked){
      return true;
    }
  }
}

function isChecked(termGeneral){
  if(termGeneral.checked){
    return true;
  }
}

