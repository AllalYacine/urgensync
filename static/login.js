const { setTimeout } = require("timers");

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

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // i added this to prevent the reload of the page after submission
        const email = loginForm.querySelector('input[type="email"]');
        const password = loginForm.querySelector('input[type="password"]');

        if(!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return;
        }

    })

});