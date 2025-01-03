import { GLOBAL_DATA_STORE } from "./scripts.js";


/**
 * Creates a form with specified fields, ids, and types, and appends it to a container element.
 *
 * @param {string} container - The ID of the container element where the form will be appended.
 * @param {string[]} fields - An array of strings representing the labels for each form field.
 * @param {string[]} ids - An array of strings representing the IDs for each form input element.
 * @param {string[]} types - An array of strings representing the types for each form input element.
 * @param {string} call - The function to be called when the form is submitted.
 */



export function createForm(container, fields, ids, types, headline, call) {

    container = document.getElementById(container);
    // Create form element
    const form = document.createElement('form');
    // Add title to the form
    const title = document.createElement('h2');

    title.textContent = headline;
    form.appendChild(title);

    // Function to create label and input elements
    function createLabelInput(labelText, inputId, inputType) {
        const label = document.createElement('label');
        label.setAttribute('for', inputId);

        // Replace spaces with non-breaking spaces
        label.innerHTML = labelText.replace(/ /g, '&nbsp;');
        
        const input = document.createElement('input');
        input.setAttribute('type', inputType);
        input.setAttribute('id', inputId);

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
    }

    // Create form fields
    for (let i = 0; i < fields.length; i++) {
        createLabelInput(fields[i], ids[i], types[i]);
    }
    
    if (call) {
        
        const submitButton = document.createElement('input');

        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        submitButton.setAttribute('onclick', call); 
        form.appendChild(submitButton);
    }

    

    // Append form to body
    container.appendChild(form);
}


export function getTable() {

    const table = document.getElementById("data-table");
    const numROWS = table.rows.length;
    const numDataEntries = GLOBAL_DATA_STORE.length;

    if ((numROWS - numDataEntries) == 2) {

        const tableBody = document.getElementById('table-body');
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
    }

    for (let i = 1; i <= numDataEntries; i++) {
        let data = GLOBAL_DATA_STORE[i-1];
        if (data.isStarter) {
            const row = table.rows[i + 1];

            row.classList.add("starter-row");

            row.cells[0].textContent = data.starterData.Starter;
            row.cells[1].textContent = data.starterData.Title;
            row.cells[2].textContent = data.starterData.Welcome;

            row.cells[1].colSpan = 3;
            row.cells[2].colSpan = 4;

            if (row.cells.length > 3) {
                for (let j = 3; j <= 7; j++) {
                    row.deleteCell(3);
                }
            }
        }
        else {
            const row = table.rows[i + 1];

            row.cells[0].textContent = data.businessData.Event_1;
            row.cells[1].textContent = data.businessData.Period_1;
            row.cells[2].textContent = data.businessData.Business_1;
            row.cells[3].textContent = data.businessData.Sub_activity_1;
            row.cells[4].textContent = data.businessData.Event_2;
            row.cells[5].textContent = data.businessData.Period_2;
            row.cells[6].textContent = data.businessData.Business_2;
            row.cells[7].textContent = data.businessData.Sub_activity_2;
        }
    }
}
