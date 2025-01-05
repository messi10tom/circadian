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



export function createForm(container, 
                           fields, 
                           ids, 
                           types, 
                           headline, 
                           call, 
                           br=0) {

    container = document.getElementById(container);
    // Create form element
    const form = document.createElement('form');
    // Add title to the form
    const title = document.createElement('h2');

    title.textContent = headline;
    title.classList.add("SBT-title")
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

        for (let i = 0; i < br; i++) {
            form.appendChild(document.createElement('br'));
        }
        // Create submit button
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
        const row = table.rows[i + 1];

        // Cleaning the row
        while (row.firstChild) {
            row.removeChild(row.firstChild);
        }

        // Remove any class if the row has
        row.className = '';
        for (let j = 0; j < 8; j++) {
            row.insertCell(0);
}
        
        if (data.isStarter) {

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
        else if (data.isTODO) {

            row.classList.add("todo-row");

            row.cells[0].textContent = data.TODOdata.TODO;
            row.cells[1].textContent = data.TODOdata.Business;
            row.cells[2].textContent = data.TODOdata.Sub_activity;

            row.cells[1].colSpan = 3;
            row.cells[2].colSpan = 4;

            if (row.cells.length > 3) {
                for (let j = 3; j <= 7; j++) {
                    row.deleteCell(3);
                }
            }

            // row.cells[0].textContent = data.todoData.TODO;
            // row.cells[1].textContent = data.todoData.Importance;
            // row.cells[2].textContent = data.todoData.Urgency;
            // row.cells[3].textContent = data.todoData.Due;
            // row.cells[4].textContent = data.todoData.Completed;
            // row.cells[5].textContent = data.todoData.Completed_on;
            // row.cells[6].textContent = data.todoData.Completed_at;
            // row.cells[7].textContent = data.todoData.Completed_in;
        }

        else {

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


function edit() {
    let button = document.getElementById("edit-button");
    const tableBody = document.getElementById('table-body');

    if (GLOBAL_DATA_STORE.length == 0) {
        return;
    }
    
    if (button.textContent == "EDIT") {
        button.textContent = "SUBMIT";

        for (let i = 0; i < GLOBAL_DATA_STORE.length; i++) {
            for (let j = 0; j < tableBody.rows[i].cells.length; j++) {

                if (j != 0 && j != 4) {
                    tableBody.rows[i].cells[j].contentEditable = true;
  
        }}}
        
    }
    else {
        button.textContent = "EDIT";
        Array.from(tableBody.rows).forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('td[contenteditable]');
            // console.log(`Row ${index + 1}: ${Array.from(cells).map(cell => cell.textContent).join(', ')}`);
            cells.forEach((cell, colIndex) => {

                cell.contentEditable = false; // Disable editing

                const value = cell.textContent.trim(); // Get the edited value

                if (GLOBAL_DATA_STORE[rowIndex].isStarter) {
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].starterData.Title = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].starterData.Welcome = value;
                }
                else if (GLOBAL_DATA_STORE[rowIndex].isTODO) {
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].TODOdata.Business = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].TODOdata.Sub_activity = value;
                }
                else {
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].businessData.Period_1 = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].businessData.Business_1 = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].businessData.Sub_activity_1 = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].businessData.Period_2 = value;
                    else if (colIndex == 4) GLOBAL_DATA_STORE[rowIndex].businessData.Business_2 = value;
                    else if (colIndex == 5) GLOBAL_DATA_STORE[rowIndex].businessData.Sub_activity_2 = value;
                }

            });
            
        });
}}





window.edit = edit;
