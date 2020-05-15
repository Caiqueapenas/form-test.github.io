//========================Mouse over/out event===================
let mouseOver = document.querySelector('.overMouse')
mouseOver.addEventListener('mouseover', overFunction)

let mouseOut = document.querySelector('.outMouse')
mouseOut.addEventListener('mouseout', outFunction)

function overFunction(){
    mouseOver.style.opacity = '.84'
	mouseOver.style.transition = '0.3s' 
}
function outFunction() {
    mouseOut.style.opacity ='0.67'
	mouseOut.style.transition = '0.3s'   
}
//====================(end)Mouse over/out event==================    


// Input fields
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const email = document.getElementById('email')

// form
const form = document.getElementById('myForm')
// validation colors
const green = '#4CEF50'
const red = '#F44336'

// handle form
form.addEventListener('submit', function (event){
    // prevente default behavior
    event.preventDefault()
    if(
        validateFirstName() &&
        validateLastName() && 
        validatePassword() &&
        validateConfirmPassword() &&
        validateEmail()

    ){
        const name = firstName.value
        const container = document.querySelector('div.container')
        const loader = document.createElement('div')
        loader.className = 'progress'
        const loadingBar = document.createElement('div')
        loadingBar.className = 'inderterminate'
        loader.appendChild(loadingBar)
        container.appendChild(loader)
        setTimeout(function () {
            const loaderDiv = document.querySelector('div.progress')
            const panel = document.createElement('div')
            panel.className ='card-panel green'
            const text = document.createElement('span')
            text.className = 'white-text'
            text.appendChild(document.createTextNode(`Inscrição realizada com sucesso! Bem-vindo(a), ${name}`))
            panel.appendChild(text)
            container.replaceChild(panel, loaderDiv)
        }, 1000)

    }
})

// Validators
function validateFirstName(){
    // check if is empty
    if(checkIfEmpty(firstName)) return;
    // check if is has only letters
    if(!checkIfOnlyLetters(firstName)) return
    return true
}

function validateLastName(){
    // check if is empty
    if(checkIfEmpty(lastName)) return;
    // check if is has only letters
    if(!checkIfOnlyLetters(lastName)) return
    return true
}

function validatePassword(){
    // Empty check
    if (checkIfEmpty(password)) return
    // Must be in certain length
    if(!meetLength(password, 4, 100)) return
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    if(!containsCharacters(password, 4)) return
    return true
}

function validateConfirmPassword(){
    if(password.className !== 'valid'){
        setInvalid(confirmPassword, '* Digite uma senha válida')
        return
    }
    // If they match
    if(password.value !== confirmPassword.value){
        setInvalid(confirmPassword, '* As senhas devem combinar')
        return
    }
    else{
        setValid(confirmPassword)
    }
    return true
}

function validateEmail(){
    if(checkIfEmpty(email)) return
    if(!containsCharacters(email, 5)) return
    return true
}




// Utility functions
function checkIfEmpty(field) {
    if(isEmpty(field.value.trim())){
        // set field invalid
        setInvalid(field, `* ${field.name} é um campo obrigatório`)
        return true
    }
    else{
        // set field valid
        setValid(field)
        return false
    }
    
}

function isEmpty(value) {
    if(value === '') return true
    return false
    
}

function setInvalid(field, message) {
    field.className = 'invalid'
    field.nextElementSibling.innerHTML = message
    field.nextElementSibling.style.color = red
    
}

function setValid(field) {
    field.className = 'valid'
    field.nextElementSibling.innerHTML = ''
    // field.nextElementSibling.style.color = green
    
}

function checkIfOnlyLetters(field) {
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field)
        return true
    }
    else{
        setInvalid(field, `* ${field.name} deve conter apenas letras`)
        return false
    }
    
}
function meetLength(field, minLength, maxLength){
    if(field.value.length >= minLength && field.value.length < maxLength){
        setValid(field)
        return true
    }
    else if(field.value.length < minLength){
        setInvalid(field, `* ${field.name} deve ter ao menos ${minLength} caracteres`)
        return false
    }
    else {
        setInvalid(field, `* ${field.name} deve ter menos de ${maxLength} caracteres`)
        return false
    }
    
}
function containsCharacters(field, code){
    let regEx;
    switch(code){
        case 1:
            // letters
            regEx = /(?=.*[a-zA-z])/
            return matchWithRegEx(regEx, field, `* Deve conter ao menos uma letra`)
        
        case 2:
            // letters and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/
            return matchWithRegEx(regEx, field, `* Deve conter ao menos uma letra e um número`)

        case 3:
            // UpperCase, Lowercase and number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
            return matchWithRegEx(regEx, field, `* Deve conter no mínimo uma letra maiúscula, minúscula e um número`)

        case 4:
            // UpperCase, Lowercase, number and special character
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
            return matchWithRegEx(regEx, field, `* Deve conter letra maiúscula, minúscula, número e caracteres especiais`)

        case 5:
            // email pattern
            regEx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return matchWithRegEx(regEx, field, `* Digite um email válido`)


        default:
            return false;
    }
}
function matchWithRegEx(regEx, field, message){
    if(field.value.match(regEx)){
        setValid(field)
        return true
    }
    else{
        setInvalid(field, message)
        return false
    }
}













/*==============================ERROR=========================
// Input fields
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const email = document.getElementById('email')
// Form
const form = document.getElementById('myForm')
// Validation colors
const green = '#4CEF50'
const red = '#F44336'

function validateFirstName() {
    // check if is empty
    if(checkIfEmpty(firstName)) return
    
    // check if has only letters
    if(!checkIfOnlyLetters(firstName)) return
    return true
    
}

function checkIfEmpty(field) {
    if(isEmpty(field.value.trim())){
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`)
        return true
    }
    else{
        // set field valid
        setValid(field)
        return false
    }
    
}
function isEmpty(value){
    if(value === '') return true;
    return false;
}

function setInvalid(field, message){
    field.className = 'invalid'
    field.nextElementeSibling.innerHTML = message
    field.nextElementeSibling.style.color = red
}

function setValid(field, message){
    field.className = 'valid'
    field.nextElementeSibling.innerHTML = ''
    // field.nextElementeSibling.style.color = green
}

function checkIfOnlyLetters(field) {
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field)
        return true
    }
    else{
        setInvalid(field, `${field.name} must contaion only letters`)
    }
    
}




*/