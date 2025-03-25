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
    };

    // the success message
    const showSuccess = (form, message) => {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.backgroundColor = "#4caf50";
        successDiv.style.color = 'white';
        successDiv.style.padding = "10px";
        successDiv.style.borderRadius = "5px";
        successDiv.style.marginTop = "10px";
        successDiv.style.textAlign = "center";
        successDiv.textContent = message;

        form.appendChild(successDiv);

        // 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    };

    // submission 
    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = addUserForm.querySelector('input[type="text"]');
        const email = addUserForm.querySelector('input[type="email"]');
        const password = addUserForm.querySelectorAll('input[type="password"]')[0];
        const confirmPassword = addUserForm.querySelectorAll('input[type="password"]')[1];
        const role = addUserForm.querySelector('select');

        if (name.value.length < 3) {
            showError(name, 'Name must be at least 3 characters long');
            return;
        }

        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return;
        }

        if (!validatePassword(password.value)) {
            showError(password, 'Password must be at least 8 characters long and contain uppercase, lowercase and numbers');
            return;
        }

        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            return;
        }

        if (!role.value) {
            showError(role, 'Please select a role');
            return;
        }

        // show the message of success
        showSuccess(addUserForm, 'User added successfully!');
        addUserForm.reset();
    });


});