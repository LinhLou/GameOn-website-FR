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
const modalBody=document.querySelector('.modal-body');
const modalContent = document.querySelector('.content');
const boutonX = document.querySelectorAll('.close');
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
let locationChosi;

let errorMessages={
  firstName:'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
  lastName:'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  email:'Veuillez rentrer un email valide.',
  birthdate:'Veuillez entrer votre date de naissance.',
  quantity:'Veuillez renter une valeur entre 0 et 99',
  radioBtns:'Vous devez choisir une option.',
  termGeneral:'Vous devez vérifier que vous acceptez les termes et conditions.'
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch close bouton-x
boutonX.forEach((btn)=>btn.addEventListener('click',(e)=>closeModal(e.target)));
// launch submission event
form.addEventListener("submit",validate,false);



// add event to input to check entry validation
firstName.addEventListener('input',(e)=>messageVisibility(e.target,isValidUserName(e.target),errorMessages.firstName),false);

lastName.addEventListener('input',(e)=>messageVisibility(e.target,isValidUserName(e.target),errorMessages.lastName),false);

email.addEventListener('input',(e)=>messageVisibility(e.target,isValidEmail(e.target),errorMessages.email),false);

birthdate.addEventListener('input',(e)=>messageVisibility(e.target,isValidBirthdate(e.target),errorMessages.birthdate),false);

quantity.addEventListener('input',(e)=>messageVisibility(e.target,isFilled(e.target),errorMessages.quantity),false);

radioBtns.forEach((ele)=>{ele.addEventListener('click',(e)=>{messageVisibility(e.target,isChecked(e.target),errorMessages.radioBtns);
  
if(isChecked(e.target)){
  locationChosi=e.target.value;
};},false)});

termGeneral.addEventListener('click',(e)=>{messageVisibility(e.target,isChecked(e.target),errorMessages.termGeneral);
if(isChecked(e.target)){
  submitBtn.disabled=false;
}else{
  submitBtn.disabled=true;
}},false);



// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal form
function closeModal(ele) {
  ele.parentNode.parentNode.style.display = "none";
}


// launch form validation

function validate(e){
  e.preventDefault();
  const conditions = isValidUserName(firstName)&&isValidUserName(lastName)&&isValidEmail(email)&&isFilled(birthdate)&&isFilled(quantity)&&isRequired(radioBtns)&&isChecked(termGeneral);
    if(!conditions){
      animationFormInvalid();
      messageVisibility(firstName,isValidUserName(firstName),errorMessages.firstName);
      messageVisibility(lastName,isValidUserName(lastName),errorMessages.lastName);
      messageVisibility(email,isValidEmail(email),errorMessages.email);
      messageVisibility(birthdate,isValidBirthdate(birthdate),errorMessages.birthdate);
      messageVisibility(quantity,isFilled(quantity),errorMessages.quantity);
      messageVisibility(radioBtns[1],isRequired(radioBtns),errorMessages.radioBtns);
      messageVisibility(termGeneral,isChecked(termGeneral),errorMessages.termGeneral);
    }else{
      showUserInfos();
      modalBody.innerHTML=`<p class="thanks">Merci pour <br>votre inscription!</p>
      <button class="btn-submit button btn-fermer">Fermer</button>`;
      const fermerBtn = document.querySelector('.btn-fermer');
      // launch fermer btn
      fermerBtn.addEventListener('click',(e)=>{e.target.parentNode.parentNode.parentNode.style.display='none'});
    }
    
}


// check input and show the equivalent messages
function messageVisibility(ele,condition,message){
  if(!condition){
    showErrorMessage(ele,message);
    removValidInput(ele);
  }else{
    removeErrorMessage(ele);
    showValidInput(ele);
  }
}
//  animation when form not valid
function animationFormInvalid() {
  document.querySelector(".content").className = "content";
  requestAnimationFrame((time) => {
    requestAnimationFrame((time) => {
      document.querySelector(".content").className = "content animationFormInvalid";
    });
  });
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
// show valid input
function showValidInput(ele){
  ele.parentNode.setAttribute("data-input-validation","true");
}
// show valid input
function removValidInput(ele){
  ele.parentNode.removeAttribute("data-input-validation");
}

// function showUserInfos
function showUserInfos(){
  console.log(`prénom: ${firstName.value}`);
  console.log(`nom: ${lastName.value}`);
  console.log(`adress e-mail: ${email.value}`);
  console.log(`date de naissance: ${birthdate.value}`);
  console.log(`nombre de tournois GameOn participé: ${quantity.value}`);
  console.log(`location: ${locationChosi}`);
  console.log(`general term: checked`);

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

function isValidBirthdate(ele){
  if(ele.value!=''){
    const today = new Date(); // today date
    const dateSaisi = new Date(ele.value);
    const diffYear = Math.trunc((today.getTime()-dateSaisi.getTime())/31556952000); // Math.trunc: get the number before decimal point without rounding
    if(diffYear<18){
      errorMessages.birthdate="L'évènement requiert à ce que les personnes inscrites soient majeures";
      return false;
    }else{
      return true;
    }
  }else{
    errorMessages.birthdate="Veuillez entrer votre date de naissance.";
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

