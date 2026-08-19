const doctors = [
    { name: 'Dr. Ananya Sharma', degree: 'MBBS, MD (Cardiology)', speciality: 'Cardiology', clinic: 'HeartFirst Clinic', address: 'Bandra West, Mumbai, Maharashtra', fee: 1200, availability: 'Available today', initials: 'AS', tone: 'rose' },
    { name: 'Dr. Rohan Mehta', degree: 'MBBS, MD (Dermatology)', speciality: 'Dermatology', clinic: 'Skin & Glow Centre', address: 'Koramangala, Bengaluru, Karnataka', fee: 900, availability: 'Available today', initials: 'RM', tone: 'gold' },
    { name: 'Dr. Kavya Iyer', degree: 'MBBS, DNB (Paediatrics)', speciality: 'Paediatrics', clinic: 'Little Steps Hospital', address: 'Adyar, Chennai, Tamil Nadu', fee: 800, availability: 'Tomorrow, 10:00 AM', initials: 'KI', tone: 'blue' },
    { name: 'Dr. Arjun Nair', degree: 'MBBS, MRCPsych (UK)', speciality: 'Mental health', clinic: 'Mindful Path Clinic', address: 'Kakkanad, Kochi, Kerala', fee: 1100, availability: 'Available today', initials: 'AN', tone: 'green' },
    { name: 'Dr. Meera Patel', degree: 'MBBS, MD (General Medicine)', speciality: 'General medicine', clinic: 'Wellness Point', address: 'Satellite, Ahmedabad, Gujarat', fee: 700, availability: 'Tomorrow, 9:30 AM', initials: 'MP', tone: 'purple' },
    { name: 'Dr. Vikram Singh', degree: 'MBBS, DM (Cardiology)', speciality: 'Cardiology', clinic: 'Pulse Care Hospital', address: 'Saket, New Delhi, Delhi', fee: 1500, availability: 'Friday, 11:00 AM', initials: 'VS', tone: 'orange' }
];

const gate = document.querySelector('#admin-gate');
const directory = document.querySelector('#directory-page');
const adminForm = document.querySelector('#admin-form');
const errorMessage = document.querySelector('#login-error');
const passwordInput = document.querySelector('#admin-password');
const searchInput = document.querySelector('#doctor-search');
const specialityFilter = document.querySelector('#speciality-filter');
const doctorGrid = document.querySelector('#doctor-grid');
const emptyState = document.querySelector('#empty-state');

function showDirectory() {
    gate.hidden = true;
    directory.hidden = false;
    renderDoctors();
}

function renderDoctors() {
    const search = searchInput.value.trim().toLowerCase();
    const speciality = specialityFilter.value;
    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch = `${doctor.name} ${doctor.speciality} ${doctor.degree}`.toLowerCase().includes(search);
        return matchesSearch && (speciality === 'all' || doctor.speciality === speciality);
    });

    doctorGrid.innerHTML = filteredDoctors.map((doctor) => `
        <article class="doctor-card">
            <div class="doctor-card-top"><div class="avatar ${doctor.tone}">${doctor.initials}</div><span class="availability"><i></i>${doctor.availability}</span></div>
            <h2>${doctor.name}</h2>
            <p class="degree">${doctor.degree}</p>
            <span class="speciality-tag">${doctor.speciality}</span>
            <div class="detail-row"><span class="detail-icon">⌂</span><div><strong>${doctor.clinic}</strong><span>${doctor.address}</span></div></div>
            <div class="fee-row"><span>Consultation fee</span><strong>₹${doctor.fee.toLocaleString('en-IN')}</strong></div>
        </article>
    `).join('');
    emptyState.hidden = filteredDoctors.length > 0;
}

adminForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#admin-email').value.trim().toLowerCase();
    const password = passwordInput.value;
    if (email === 'admin@carebridge.test' && password === 'Admin@123') {
        sessionStorage.setItem('carebridgeAdmin', 'true');
        errorMessage.textContent = '';
        showDirectory();
        return;
    }
    errorMessage.textContent = 'That admin email or password is incorrect.';
});

document.querySelector('#toggle-admin-password').addEventListener('click', (event) => {
    const showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    event.currentTarget.textContent = showing ? 'Show' : 'Hide';
});

searchInput.addEventListener('input', renderDoctors);
specialityFilter.addEventListener('change', renderDoctors);
document.querySelector('#logout-button').addEventListener('click', () => {
    sessionStorage.removeItem('carebridgeAdmin');
    directory.hidden = true;
    gate.hidden = false;
    adminForm.reset();
});

if (sessionStorage.getItem('carebridgeAdmin') === 'true') showDirectory();