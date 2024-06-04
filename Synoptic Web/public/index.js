document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const nameError = document.getElementById('nameError');
    const numberError = document.getElementById('numberError');
    const confirmationMessage = document.getElementById('confirmationMessage');
    

    let isValid = true;
    // use regex to check if name is alphabetic
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        nameError.textContent = 'Invalid name format (letters and spaces only).'; // dynamically load error message into the page
        isValid = false;
    }
    // use regex to check if number is numeric and between 9-15 digits
    if (!/^\d{9,15}$/.test(number)) {
        numberError.textContent = 'Invalid number format (9-15 digits).'; // dynamically load error message into the page
        isValid = false;
    }

    if (isValid) {
        confirmationMessage.style.display = 'block'; // display validation message if submitted name and number is valid
        this.reset();
    }
    else
    {
        confirmationMessage.style.display = 'none' // hide validation message if name or number is invalid
    }
});

document.getElementById('name').addEventListener('input', function() { // hide erorr message if input field is changed
    const nameError = document.getElementById('nameError');
    nameError.textContent = '';
});

document.getElementById('number').addEventListener('input', function() { // hide error message if input field is changed
    const numberError = document.getElementById('numberError');
    numberError.textContent = '';
});