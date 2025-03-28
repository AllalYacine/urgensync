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

        // after 15 seconds, 
        setTimeout(() => {
            errorDiv.remove();
            input.style.borderColor = '#ddd';
        }, 150000);
    };

   // show success is useless, user is going to be redirected to home page

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // i added this to prevent the reload of the page after submission
        const email = loginForm.querySelector('input[type="email"]');
        const password = loginForm.querySelector('input[type="password"]');

       /*  if(!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return;
        } */
        
        // send data to server --
        const formData = new URLSearchParams();
        formData.append("email", loginForm.querySelector('input[name="email"]').value);
        formData.append("password", loginForm.querySelector('input[name="password"]').value);

        const response = await fetch(loginForm.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });
    
        const result = await response.json();

        console.log(result.error); // for testing
        
        if (result.userError) {
            showError(email, result.userError);
        } else if (result.passwordError){
            showError(password, result.passwordError);
        };// else the server will redirect u to home page

        if (result.redirect) {
            window.location.href = result.redirect; // browser handle the redirect
        }

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