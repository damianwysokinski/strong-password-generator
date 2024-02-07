const popup = document.querySelector('#popup');
const popupCloseBtn = document.querySelector('.popup__btn--close');
const passwordCopyBtn = document.querySelector('.generator__btn');
const copyBtn = document.getElementById('copyBtn');
const refreshBtn = document.getElementById('refreshBtn');

const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')

const includeEasyToSayElement = document.getElementById('includeEasyToSay')
const includeEasyToReadElement = document.getElementById('includeEasyToRead')
const includeAllCharactersElement = document.getElementById('includeAllCharacters')

const includeUppercaseElement = document.getElementById('includeUppercase')
const includeLowercaseElement = document.getElementById('includeLowercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')

const form = document.getElementById('passwordGeneratorForm')
const passwordInputElement = document.getElementById('passwordInput')

const LOWERCASE_CHAR_CODES = "abcdefghijklmnopqrstuvwxyz"
const NUMBER_CHAR_CODES = "1234567890"
const SYMBOL_CHAR_CODES = "!@#$%^&*()"

const options = {
    passwordLength: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
}

characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

form.addEventListener('input', e => handleOptionsChange(e))

function handleOptionsChange(e) {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value

  const includeEasyToSay = includeEasyToSayElement.checked
  const includeEasyToRead = includeEasyToReadElement.checked
  const includeAllCharacters = includeAllCharactersElement.checked

  const includeUppercase = includeUppercaseElement.checked
  const includeLowercase = includeLowercaseElement.checked
  let includeNumbers = includeNumbersElement.checked
  let includeSymbols = includeSymbolsElement.checked

  if (includeEasyToSay) {
    includeNumbersElement.checked = includeNumbers = includeSymbolsElement.checked = includeSymbols = false;
    includeNumbersElement.disabled = includeSymbolsElement.disabled = true;
  }

  if (includeEasyToRead || includeAllCharacters) {
    includeNumbersElement.disabled = includeSymbolsElement.disabled = false;
  }

  const password = generatePassword(characterAmount, includeUppercase, includeLowercase, includeNumbers, includeSymbols, includeEasyToRead)
  passwordInputElement.value = password
}

function generatePassword(characterAmount, includeUppercase, includeLowercase, includeNumbers, includeSymbols, includeEasyToRead) {
    let charCodes = LOWERCASE_CHAR_CODES

    if (includeUppercase && !includeLowercase) charCodes = charCodes.toUpperCase()
    if (includeUppercase && includeLowercase) charCodes += charCodes.toUpperCase()
    if (includeSymbols) charCodes += SYMBOL_CHAR_CODES
    if (includeNumbers) charCodes += NUMBER_CHAR_CODES
    if (includeEasyToRead) charCodes = charCodes.replace(/[I1O0]/gi, '')

    const passwordCharacters = []
    
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(characterCode)
    }
    return passwordCharacters.join('')
}

function syncCharacterAmount(e) {
  let { value, min, max } = e.target;

  if (value < 1) value = 1;
  if (value > 50) value = 50;

  characterAmountNumber.value = value
  characterAmountRange.value = value

  characterAmountRange.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
}

function copyPassword(e) {
  e.preventDefault();
  passwordInputElement.select();
  document.execCommand("copy");
  
  showPopup();
}

function showPopup() {
  popup.classList.add('active');
}

function hidePopup() {
  popup.classList.remove('active');
}

function init() {
    const { passwordLength, uppercase, lowercase, numbers, symbols } = options;
    const password = generatePassword(passwordLength, uppercase, lowercase, numbers, symbols);
    
    passwordInputElement.value = password
    characterAmountRange.value = characterAmountNumber.value = passwordLength;
    includeUppercaseElement.checked = uppercase;
    includeLowercaseElement.checked = lowercase;
    includeNumbersElement.checked = numbers;
    includeSymbolsElement.checked = symbols;
}

init();

passwordCopyBtn.addEventListener('click', copyPassword);
popupCloseBtn.addEventListener('click', hidePopup);
copyBtn.addEventListener('click', copyPassword);
refreshBtn.addEventListener('click', e => handleOptionsChange(e))