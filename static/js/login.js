document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // validation statique et confirmation de l'email, change it later if you want
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // if there is an error, we create an error message and show it in the input field 
    const showError = (input, message) => {
        const formInfo = input.parentElement;
        const errorDiv = document.createElement('div');
        // random styling
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff3333'
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;

        formInfo.appendChild(errorDiv);
        input.style.borderColor= "#ff3333";

        // if an error message already exists and then another one comes then we remove the previous one idk i found it on a video
        const existingError = formInfo.querySelector('.error-message');
        if(existingError) {
            formInfo.removeChild(existingError);
        }

        // after 3 seconds, the error disappears, you can change the time as you like
        setTimeout(() => {
            errorDiv.remove();
            input.style.borderColor = '#ddd';
        }, 3000);
    };

    // after clicking on the submission button and everything goes right, we make a success message 
    const showSuccess = (form, message) => {
        const successDiv = document.createElement('div');
        // random styling 
        successDiv.className = 'success-message';
        successDiv.style.backgroundColor = '#4CAF50';
        successDiv.style.color = 'white';
        successDiv.style.padding = '10px';
        successDiv.borderRadius = '5px';
        successDiv.marginTop = '10px';
        successDiv.style.textAlign = 'center';
        successDiv.textContent = message;

        form.appendChild(successDiv);

        // same thing with the timeout
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // i added this to prevent the reload of the page after submission
        const email = loginForm.querySelector('input[type="email"]');
        const password = loginForm.querySelector('input[type="password"]');

        if(!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return;
        }
        // this is just a test to know it works
        showSuccess(loginForm, 'Login successful!');
        loginForm.reset();
    });

    // these animations will look more good with the css applied i think they look cool
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    })
});

// i will remove these comments later once confirmed