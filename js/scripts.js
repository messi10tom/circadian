const dateElement = document.getElementById('current-date');
const today = new Date();
const options = { day: '2-digit', month: 'long', year: 'numeric' };
dateElement.textContent = today.toLocaleDateString('en-GB', options);