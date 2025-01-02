const passwordBox = document.getElementById("password");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.querySelector("img[alt=copy-icon]");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "@#$%^&*()_+~|}{[]></-=";
let all = "";

let length = 12;
const selectedLength = document.getElementById("password-length-selection");
const chkSymbols = document.getElementById("include-symbol-chkbox");
const chkNumbers = document.getElementById("include-number-chkbox");
const chkDublicate = document.getElementById("no-duplicate");

function generateNumberInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function generatePassword() {
  all = ""; // resete all
  let password = "";

  password +=
    uppercaseLetters[generateNumberInRange(0, uppercaseLetters.length)];
  all += uppercaseLetters;

  password +=
    lowercaseLetters[generateNumberInRange(0, lowercaseLetters.length)];
  all += lowercaseLetters;

  if (isNumbersAllowed()) {
    password += numbers[generateNumberInRange(0, numbers.length)];
    all += numbers;
  }
  if (isSymbolsAllowed()) {
    password += symbols[generateNumberInRange(0, symbols.length)];
    all += symbols;
  }

  while (password.length < length) {
    var character = all[generateNumberInRange(0, all.length)];

    if (chkDublicate.checked) {
      if (!isCharExist(character, password)) {
        password += character;
      }
    } else {
      password += character;
    }
  }

  return password;
}

function isCharExist(character, password) {
  return password.includes(character);
}

function copyPassword() {
  passwordBox.select();
  document.execCommand("copy");
}

generateBtn.addEventListener("click", () => {
  passwordBox.value = generatePassword();
});

copyBtn.addEventListener("click", () => {
  copyPassword();
});

selectedLength.addEventListener("change", () => {
  length = selectedLength.value;
});

function isSymbolsAllowed() {
  return chkSymbols.checked;
}

function isNumbersAllowed() {
  return chkNumbers.checked;
}
