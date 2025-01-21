const form = document.getElementById('myForm');
const checkLogos = document.querySelectorAll(".check-container");

const nameError = document.getElementById("name-error");
const phoneError = document.getElementById("phone-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const submitError = document.getElementById("submit-error");

const contactName = document.getElementById("contact-name");
const contactPhone = document.getElementById("contact-phone");
const contactEmail = document.getElementById("contact-email");
const contactMessage = document.getElementById("contact-message");
const btnSubmit = document.getElementById("btn-submit");

contactName.addEventListener("input", validateName);
contactPhone.addEventListener("input", validatePhone);
contactEmail.addEventListener("input", validateEmail);
contactMessage.addEventListener("input", validateMessage);
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    validateSubmit();
});

function validateName() {
  let name = contactName.value;
  let regex = /^[a-zA-Z]+( [a-zA-Z]+)+$/g;
  let checkLogo = checkLogos[0];

  if (name.length === 0) {
    return showError(nameError, checkLogo, "Name is required");
  }if(isNameContainNumbers(name)) {
    return showError(nameError, checkLogo, "Write letters[a-z] only");
  }if (!name.match(regex)) {
    return showError(nameError, checkLogo, "Write full name");
  }

  nameError.textContent = "";
  checkLogo.style.visibility = "visible";
  return true;
}

function validatePhone() {
  let phone = contactPhone.value;
  let regex = /^\d{3}\s*\d{3}\s*\d{3}$/;
  let checkLogo = checkLogos[1];

  if (phone.length === 0) {
    return showError(phoneError, checkLogo, "Phone is required");
  }
  if (removeAllSpaces(phone).length !== 9) {
    return showError(phoneError, checkLogo, "Phone no should be 9 digits");
  }
  if (!phone.match(regex)) {
    return showError(phoneError, checkLogo, "Only digits please.");
  }

  phoneError.textContent = "";
  checkLogo.style.visibility = "visible";
  return true;
}

function validateEmail() {
  let email = contactEmail.value;
  let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkLogo = checkLogos[2];

  if(email.length === 0) {
    return showError(emailError, checkLogo, "email is required");
  } if(!email.match(regex)) {
    return showError(emailError, checkLogo, "write a valid email");
  }

  emailError.textContent = "";
  checkLogo.style.visibility = "visible";
  return true;
}

function validateMessage() {
    let required = 30;
    let message = contactMessage.value;
    let left = required - message.length;
    let checkLogo = checkLogos[3];

    if(left > 0) {
        return showError(messageError, checkLogo, `${left} more charachters required`);
    }

    messageError.textContent = "";
    checkLogo.style.visibility = "visible";
    return true;  
}

function validateSubmit() {
    if(!validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
        submitError.style.display = 'block'
        submitError.textContent = "please fix the error to submit";
        btnSubmit.style.animation = "error-effect 0.1s linear infinite";

        setTimeout(() => {
            btnSubmit.style.animation = "";
            submitError.style.display = 'none';
        }, 1500);
        
        return false;
    }

    form.submit();
}

function removeAllSpaces(str) {
  return str.replace(/\s+/g, "");
}

function showError(errorElement, checkLogo, message) {
    errorElement.textContent = message;
    checkLogo.style.visibility = "hidden";
    return false;
}

function isNameContainNumbers(str) {
  return str.match(/[0-9]/g) !== null;
}