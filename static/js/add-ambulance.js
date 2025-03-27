document.addEventListener('DOMContentLoaded', () => {
    const addAmbulanceForm = document.getElementById('addAmbulanceForm');

    const validateAmbulanceID = (id) => {
        const idRegex = /^[0-9]{10}$/;
        return idRegex.test(id);
    };

    const validateLocation = (location) => {
        return location.trim().length >= 3;
    };

    const validateDriverName = (name) => {
        const nameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;
        return nameRegex.test(name) && name.length >= 3;
    };

    const validateDriverContact = (contact) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(contact);
    };

    const showError = (input, message) => {
        const formInfo = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = "#ff3333";
        errorDiv.style.fontSize = "0.8em";
        errorDiv.style.marginTop = "5px";
        errorDiv.textContent = message;

        const existingError = formInfo.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        formInfo.appendChild(errorDiv);
        input.style.borderColor = "#ff3333";

        setTimeout(() => {
            errorDiv.remove();
            input.style.borderColor = "#ddd";
        }, 150000);
    };

    addAmbulanceForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const ambulanceID = addAmbulanceForm.querySelector('input[name="ambulance_id"]');
        const location = addAmbulanceForm.querySelector('input[name="location"]');
        const driverName = addAmbulanceForm.querySelector('input[name="driver_name"]');
        const driverContact = addAmbulanceForm.querySelector('input[name="driver_contact"]');
        const status = addAmbulanceForm.querySelector('select[name="status"]');

        if (!validateAmbulanceID(ambulanceID.value)) {
            showError(ambulanceID, 'Invalid Ambulance ID. Use at least 3 alphanumeric characters.');
            return;
        }

        if (!validateLocation(location.value)) {
            showError(location, 'Location must be at least 3 characters long.');
            return;
        }

        if (!validateDriverName(driverName.value)) {
            showError(driverName, 'Invalid driver name. Use only letters with a single space.');
            return;
        }

        if (!validateDriverContact(driverContact.value)) {
            showError(driverContact, 'Invalid contact number.');
            return;
        }

        if (!status.value) {
            showError(status, 'Please select a status.');
            return;
        }

        const formData = new URLSearchParams();
        formData.append("ambulance_id", ambulanceID.value);
        formData.append("location", location.value);
        formData.append("driver_name", driverName.value);
        formData.append("driver_contact", driverContact.value);
        formData.append("status", status.value);

        // Send data to server
        const response = await fetch(addAmbulanceForm.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const result = await response.json();

        if (result.ambulanceError) {
            showError(ambulanceID, result.ambulanceError);
        } else if (result.locationError) {
            showError(location, result.locationError);
        } else if (result.driverError) {
            showError(driverName, result.driverError);
        } else if (result.contactError) {
            showError(driverContact, result.contactError);
        } else if (result.serverError) {
            showError(ambulanceID, result.serverError);
        }

        if (result.redirect) {
            window.location.href = result.redirect;
        }

        addAmbulanceForm.reset();
    });

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
