import { GLOBAL_DATA_STORE } from "./scripts.js";
import { reCalculateEvents } from "./basics.js";


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
        if (labelText.includes("Period")) {

            var dropdown = document.createElement('select');
            dropdown.setAttribute('id', `${inputId}-dropdown`);
            const optionPeriod = document.createElement('option');
            optionPeriod.value = 'period';
            optionPeriod.text = 'Period';
            const optionTime = document.createElement('option');
            optionTime.value = 'time';
            optionTime.text = 'Time';

            // Add event listener to dropdown
            // dropdown.addEventListener('change', function() {
            //     if (dropdown.value === 'period') {
            //         inputType = 'number';
            //     } else if (dropdown.value === 'time') {
            //         inputType = 'time';
            //     }
            // });

            dropdown.appendChild(optionPeriod);
            dropdown.appendChild(optionTime);
        }
        const label = document.createElement('label');
        label.setAttribute('for', inputId);

        // Replace spaces with non-breaking spaces
        label.innerHTML = labelText.replace(/ /g, '&nbsp;');

        
        if (inputType === 'textarea') {
            var input = document.createElement('textarea');
            input.setAttribute('rows', '4'); // Set the number of visible text lines
            input.setAttribute('cols', '30'); // Set the width of the text area
        } else {
            var input = document.createElement('input');
            input.setAttribute('type', inputType);
        }

        input.setAttribute('id', inputId);

        if (dropdown) {
            form.appendChild(dropdown);
        } else {
            form.appendChild(label);
        }
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
            for (let j = 0; j < 10; j++) {
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
        for (let j = 0; j < 10; j++) {
            row.insertCell(0);
}
        
        if (data.isStarter) {

            row.classList.add("starter-row");

            row.cells[0].textContent = data.starterData.Starter;
            row.cells[1].textContent = data.starterData.Title;
            row.cells[2].textContent = data.starterData.Welcome;
            row.cells[3].textContent = data.starterData.Analysis;
            row.cells[4].textContent = data.starterData.Solution;

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
            row.cells[3].textContent = data.TODOdata.Analysis;
            row.cells[4].textContent = data.TODOdata.Solution;

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
            row.cells[8].textContent = data.businessData.Analysis;
            row.cells[9].textContent = data.businessData.Solution;
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
            
                if (((GLOBAL_DATA_STORE[i].isStarter && j != 0) || GLOBAL_DATA_STORE[i].isTODO && j != 0) && j <= 4) {
                    tableBody.rows[i].cells[j].contentEditable = true;
                }
                else if (j != 0 && j != 4 && !GLOBAL_DATA_STORE[i].isStarter && !GLOBAL_DATA_STORE[i].isTODO) {
                    // console.log(i, j)
                    tableBody.rows[i].cells[j].contentEditable = true;
                    enableRowClickLogging(true);
  
        }}}
        
    }
    else {
        button.textContent = "EDIT";
        Array.from(tableBody.rows).forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('td[contenteditable]');
            // console.log(`Row ${index + 1}: ${Array.from(cells).map(cell => cell.textContent).join(', ')}`);
            cells.forEach((cell, colIndex) => {

                cell.contentEditable = false; // Disable editing
                enableRowClickLogging(false);

                const value = cell.textContent.trim(); // Get the edited value

                if (GLOBAL_DATA_STORE[rowIndex].isStarter) {
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].starterData.Title = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].starterData.Welcome = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].starterData.Analysis = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].starterData.Solution = value;

                }
                else if (GLOBAL_DATA_STORE[rowIndex].isTODO) {
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].TODOdata.Business = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].TODOdata.Sub_activity = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].TODOdata.Analysis = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].TODOdata.Solution = value;
                }
                else {
                    // console.log(rowIndex, colIndex, value);
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].businessData.Period_1 = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].businessData.Business_1 = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].businessData.Sub_activity_1 = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].businessData.Period_2 = value;
                    else if (colIndex == 4) GLOBAL_DATA_STORE[rowIndex].businessData.Business_2 = value;
                    else if (colIndex == 5) GLOBAL_DATA_STORE[rowIndex].businessData.Sub_activity_2 = value;
                    else if (colIndex == 6) GLOBAL_DATA_STORE[rowIndex].businessData.Analysis = value;
                    else if (colIndex == 7) GLOBAL_DATA_STORE[rowIndex].businessData.Solution = value;

                }

            });
            
        });

        // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2));
        reCalculateEvents();
        getTable();
}}





window.edit = edit;


// Function to enable or disable row click logging
function enableRowClickLogging(rec) {
    const tableBody = document.getElementById('table-body');

    if (rec) {
        tableBody.addEventListener('click', logRowNumber);
    } else {
        tableBody.removeEventListener('click', logRowNumber);
    }
}

// function highlightRow(event) {
//     const target = event.target;
//     if (target.tagName === 'TD') {
//         const row = target.parentElement;
//         row.classList.toggle('highlighted');
//     }
// }

// Function to log the row number
function logRowNumber(event) {
    const target = event.target;
    var rowIndex;
    if (target.tagName === 'TD') {
        const row = target.parentElement;
        rowIndex = Array.from(row.parentElement.children).indexOf(row) + 1; // +1 to account for 1-based index

        // Remove 'highlighted' class from all rows
        const allRows = document.querySelectorAll('#table-body tr');
        allRows.forEach(r => r.classList.remove('highlighted'));

        // Add 'highlighted' class to the clicked row
        row.classList.add('highlighted');

        console.log('Row number:', rowIndex);
    }
}

// Ensure this function is accessible globally
window.enableRowClickLogging = enableRowClickLogging;
