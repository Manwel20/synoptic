document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const toggleMode = document.getElementById('toggleMode');
    const formTitle = document.getElementById('formTitle');
    const submitButton = document.getElementById('submit');

    // Function to submit the form
    function submitForm() {
        const name = nameInput.value;
        const email = emailInput.value;
        let isValid = true;
        
        // Validate name
        if (!(/^(?!\s*$)[a-zA-Z\s]+$/).test(name)) {
            nameError.textContent = 'Invalid name format (letters and spaces only).';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Validate email
        if (!(/^\S+@\S+\.\S+$/).test(email)) {
            emailError.textContent = "Invalid email format (must have an '@' followed by a '.').";
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        if (isValid) {
            // construct body of post request
            const mode = toggleMode.checked ? 'delete' : 'submit';
            const requestData = {
                name: name,
                email: email,
                mode: mode
            };

            // send POST request with form data
            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.text())
            .then(data => {
                form.reset();
                confirmationMessage.textContent = data;
                confirmationMessage.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                confirmationMessage.textContent = 'An error occurred. Please try again.';
                confirmationMessage.style.display = 'block';
            });
        } else {
            confirmationMessage.style.display = 'none';
        }
    }

    // event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitForm();
    });

    // remove error messages when input changes
    nameInput.addEventListener('input', function() {
        nameError.textContent = '';
    });

    emailInput.addEventListener('input', function() {
        emailError.textContent = '';
    });

    // update form text based on checkbox state
    toggleMode.addEventListener('change', function() {
        if (this.checked) {
            formTitle.textContent = 'Removal from Email Weather Update';
            submitButton.textContent = 'Remove';
        } else {
            formTitle.textContent = 'Email Weather Update Registration';
            submitButton.textContent = 'Submit';
        }
    });
});