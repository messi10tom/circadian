function addInputRow(options) {
    var template;
    if (options == "business"){
        template = `
        <input type="text" class="events-1" id="events-1" placeholder="Events">
        <input type="text" class="period-1" id="period-1" placeholder="Period">
        <input type="text" class="business-1" id="business-1" placeholder="Business">
        <input type="text" class="sub-activity-1" id="sub-activity-1" placeholder="Sub activity">
        <input type="text" class="events-2" id="events-2" placeholder="Events">
        <input type="text" class="period-2" id="period-2" placeholder="Period">
        <input type="text" class="business-2" id="business-2" placeholder="Business">
        <input type="text" class="sub-activity-2" id="sub-activity-2" placeholder="Sub activity">
    `;
    }
    if (template) {
        const inputContainer = document.getElementById('input-container');
        const newRow = document.createElement('div');
        newRow.className = 'new-row';
        newRow.innerHTML = template;
        inputContainer.appendChild(newRow);

    }
}

function addRow(options) {
    addInputRow(options);
    const table = document.getElementById('events-table');
    const newRow = table.insertRow();

    const events1 = document.getElementById('events-1').value;
    const period1 = document.getElementById('period-1').value;
    const business1 = document.getElementById('business-1').value;
    const subActivity1 = document.getElementById('sub-activity-1').value;
    const events2 = document.getElementById('events-2').value;
    const period2 = document.getElementById('period-2').value;
    const business2 = document.getElementById('business-2').value;
    const subActivity2 = document.getElementById('sub-activity-2').value;

    newRow.insertCell(0).textContent = events1;
    newRow.insertCell(1).textContent = period1;
    newRow.insertCell(2).textContent = business1;
    newRow.insertCell(3).textContent = subActivity1;
    newRow.insertCell(4).textContent = events2;
    newRow.insertCell(5).textContent = period2;
    newRow.insertCell(6).textContent = business2;
    newRow.insertCell(7).textContent = subActivity2;

    // Clear input fields after adding the row
    document.getElementById('events-1').value = '';
    document.getElementById('period-1').value = '';
    document.getElementById('business-1').value = '';
    document.getElementById('sub-activity-1').value = '';
    document.getElementById('events-2').value = '';
    document.getElementById('period-2').value = '';
    document.getElementById('business-2').value = '';
    document.getElementById('sub-activity-2').value = '';
}

const dateElement = document.getElementById('current-date');
const today = new Date();
const options = { day: '2-digit', month: 'long', year: 'numeric' };
dateElement.textContent = today.toLocaleDateString('en-GB', options);
