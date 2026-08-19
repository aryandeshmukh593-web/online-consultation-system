const form = document.querySelector('#auth-form');
const tabs = document.querySelectorAll('.role-tab');
const doctorFields = document.querySelectorAll('.doctor-only');
const patientFields = document.querySelectorAll('.patient-only');
const title = document.querySelector('#form-title');
const subtitle = document.querySelector('#form-subtitle');
const submitLabel = document.querySelector('#submit-label');
const switchCopy = document.querySelector('#switch-copy');
const switchLink = document.querySelector('#switch-link');
const passwordToggle = document.querySelector('.password-toggle');
const passwordInput = document.querySelector('#password');
const toast = document.querySelector('.toast');
let currentMode = 'patient';

function setMode(mode) {
    currentMode = mode;
    const isDoctor = mode === 'doctor';
    tabs.forEach((tab) => {
        const active = tab.dataset.mode === mode;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', active);
    });
    doctorFields.forEach((field) => { field.hidden = !isDoctor; });
    patientFields.forEach((field) => { field.hidden = isDoctor; });
    title.textContent = isDoctor ? 'Join as a doctor' : 'Patient login';
    subtitle.textContent = isDoctor ? 'Build better connections with your patients.' : 'Your health journey continues here.';
    submitLabel.textContent = isDoctor ? 'Submit registration' : 'Log in to CareBridge';
    switchCopy.innerHTML = isDoctor ? 'Already registered? <a href="#login" id="switch-link">Log in as a patient</a>' : 'New to CareBridge? <a href="#register" id="switch-link">Create a patient account</a>';
    document.querySelector('#switch-link').addEventListener('click', (event) => {
        event.preventDefault();
        showToast(isDoctor ? 'Patient login is ready.' : 'Patient registration will be available soon.');
    });
}

tabs.forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.mode)));

passwordToggle.addEventListener('click', () => {
    const showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    passwordToggle.textContent = showing ? 'Show' : 'Hide';
    passwordToggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    showToast(currentMode === 'doctor' ? 'Registration received. We’ll be in touch soon.' : 'Welcome back. Signing you in...');
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 3500);
}