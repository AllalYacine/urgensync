document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('addUserForm');

    // validation of the form, again this is dummy
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // example of password regex
    const validatePassword = (password) => {
        // minimum of 8 chars, 1 upper, 1 lower, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    // error message 
    const showError = (input, message) => {
        const formInfo = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = "#ff3333";
        errorDiv.style.fontSize = "0.8em";
        errorDiv.style.marginTop = "5px";
        errorDiv.textContent = message;

        // remove the existing messages ... if they exist already
        const existingError = formInfo.querySelector('.error-message');
        if (existingError) {
            formInfo.removeChild(existingError);
        }

        formInfo.appendChild(errorDiv);
        input.style.borderColor = "#ff3333";

        // after 3 seconds poof
        setTimeout(() => {
            errorDiv.remove();
            input.style.borderColor = "#ddd";
        }, 3000);
    }

    
});