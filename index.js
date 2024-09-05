const emailDestination = //Enter Email Here


const form = document.getElementById("form")
const fullName = document.getElementById("fullName")
const email = document.getElementById("email")
const card = document.getElementById("card")
const error = document.getElementById("error")

function emailSend(name,email,card) {

    Email.send({
        SecureToken : "1fab38c4-71c7-4cb8-a594-3657123c39aa",
        To : emailDestination,
        From : 'b.simpson051102@gmail.com',
        Subject : `Form Submission: ${name}`,
        Body : `<b>Name: </b> ${name}<br>
            <b>Email: </b>${email}<br>
            <b>Card: </b>${card}`
    }).then(
      message => alert(message)
    );
    
}



form.addEventListener('submit', e => {
    e.preventDefault();

    let confirmation = validateInputs()

    if (confirmation.name && confirmation.email && confirmation.card){
        console.log(`
            Name: ${confirmation.nameValue}\n
            Email: ${confirmation.emailValue}\n
            Card Number: ${confirmation.cardValue}
            `)

        //emailSend(confirmation.nameValue,confirmation.emailValue,confirmation.cardValue)
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};


function validName(name) {
    let nameArr = name.split('')
    const alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n",
        "o","p","q","r","s","t","u","v","w","x","y","z"];
    let nameValid = true;
    for (let letter of nameArr) {
        if (alpha.includes(letter.toLowerCase()) == false && [' ', '-'].includes(letter) == false){
            nameValid = false
        }
    }
    return(nameValid)
}

const validEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function validCardInfo(card) {
    let cardInt = card.value.split('').map(Number);

    for (let i = cardInt.length - 2; i >= 0; i = i-2) {
        let tempValue = cardInt[i];
        tempValue = tempValue * 2;
        
        if (tempValue > 9) {
            tempValue = tempValue % 10 + 1;
        }
        
        cardInt[i] = tempValue;
    }
    let total = 0;
    for (let i = 0; i < cardInt.length; i++) {
        total += cardInt[i];
    }
    return total % 10 == 0;
}

const validateInputs = () => {
    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const cardValue = card.value.trim();    

    let nameAccepted = false;
    let emailAccepted = false;
    let cardAccepted = false;

    if(nameValue === '') {
        setError(fullName, 'Name is required')
    } else if (validName(nameValue) == false) {
        setError(fullName, 'Numbers and symbols not allowed')
    } else {
        nameAccepted = true
        setSuccess(fullName);
        
    }

    if(emailValue === '') {
        setError(email, 'Email is required')
    } else if (!validEmail(emailValue)) {
        setError(email,'Email invalid');
    } else {
        setSuccess(email);
        emailAccepted = true
    }

    if (cardValue === '') {
        setError(card, 'Card number is required');
    } else if(cardValue.length != 16) {
        setError(card, 'Must be 16-digits')
    } else if (!validCardInfo(card)) {
        setError(card, 'Card details invalid')
    } else {
        setSuccess(card)
        cardAccepted = true
    }
    return {name: nameAccepted, nameValue, email: emailAccepted, emailValue, card: cardAccepted, cardValue}
};
