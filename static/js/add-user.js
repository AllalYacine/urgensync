document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('addUserForm');

    const validateFullName = (full_name) => {
        const fullNameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;
        return fullNameRegex.test(full_name);
    }

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

        // THIS DOESN'T WOOOOOOORK
        /* const existingError = formInfo.querySelector('.error-message');
        if (existingError) {
            formInfo.removeChild(existingError);
        } */

        formInfo.appendChild(errorDiv);
        input.style.borderColor = "#ff3333";

        // after 15 seconds poof
        setTimeout(() => {
            errorDiv.remove();
            input.style.borderColor = "#ddd";
        }, 150000);
    };

    // the success message
    // show success is useless, user is going to be redirected to login page

    // submission 
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = addUserForm.querySelector('input[type="text"]');
        const email = addUserForm.querySelector('input[type="email"]');
        const password = addUserForm.querySelectorAll('input[type="password"]')[0];
        const confirmPassword = addUserForm.querySelectorAll('input[type="password"]')[1];
        const role = addUserForm.querySelector('select');

        if (!validateFullName(name.value) && name.value.length < 3) {
            showError(name, 'Invalid name format. Use only letters and a single space. Atleast 3 character long.');
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

        // send data to server
        const formData = new URLSearchParams();
        formData.append("email", addUserForm.querySelector('input[name="email"]').value);
        formData.append("full_name", addUserForm.querySelector('input[name="full_name"]').value);
        formData.append("password", addUserForm.querySelector('input[name="password"]').value);
        formData.append("role", addUserForm.querySelector('select[name="role"]').value);

        const response = await fetch(addUserForm.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });
    
        const result = await response.json();

        console.log(result.error); // for testing
        
        if (result.emailError) {
            showError(email, result.emailError);
        } else if (result.passwordError){
            showError(password, result.passwordError);
        } else if (result.userError) {
            showError(email, result.userError);
        } else if (result.serverError) {
            showError(email, result.serverError);
        }; // else the server will redirect u to home page

        if (result.redirect) {
            window.location.href = result.redirect; // browser handle the redirect
        }

        addUserForm.reset();
    });

    // send data to server


    // animations the same as login
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });


});