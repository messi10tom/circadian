import { GLOBAL_DATA_STORE } from "./scripts.js";
import { reCalculateEvents, setEditMode, SAVED } from "./basics.js";


var [CELL, FOCUS] = [1, true];
export var ROW = 0;

function setFOCUS(focus) {FOCUS = focus};
window.setFOCUS = setFOCUS;


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
        input.classList.add("form-class");
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


export function getTable(editMode=false, from="") {
    console.log("From: ", from);

    const table = document.getElementById("data-table");
    const numROWS = table.rows.length;
    const numDataEntries = GLOBAL_DATA_STORE.length;

    if ((numROWS - numDataEntries) <= 5) {

        const tableBody = document.getElementById('table-body');
        for (let i = 0; i < 10; i++) {
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

            // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2));

            row.cells[0].textContent = data.starterData.Starter;
            row.cells[1].textContent = data.starterData.Title;
            row.cells[2].textContent = data.starterData.Welcome;
            row.cells[3].textContent = data.starterData.Analysis;
            row.cells[4].textContent = data.starterData.Solution;

            row.cells[1].colSpan = 3;
            row.cells[2].colSpan = 4;



            if (row.cells.length > 5) {
                for (let j = 5; j < 10; j++) {
                    row.deleteCell(5);
                }
            }

            if (editMode) {
                for (let i = 0; i < row.cells.length; i++) {
                    row.cells[i].contentEditable = true;
                }
                highlightedRow(ROW, CELL);
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

            if (editMode) {
                for (let i = 0; i < row.cells.length; i++) {
                    row.cells[i].contentEditable = true;
                }
                highlightedRow(ROW, CELL);
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

            if (editMode) {
                for (let i = 0; i < row.cells.length; i++) {
                    row.cells[i].contentEditable = true;
                }
                highlightedRow(ROW, CELL);
            }
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
        setEditMode(true);

        for (let i = 0; i < GLOBAL_DATA_STORE.length; i++) {
            for (let j = 0; j < tableBody.rows[i].cells.length; j++) {
            
                if (((GLOBAL_DATA_STORE[i].isStarter ) || GLOBAL_DATA_STORE[i].isTODO && j != 0) && j <= 4) {
                    if (j == 0) {
                        const timeInput = document.createElement('input');

                        timeInput.setAttribute('type', 'time');
                        timeInput.setAttribute('value', GLOBAL_DATA_STORE[i].starterData.Starter);
                        timeInput.id = `time-input-${i}`;
                        tableBody.rows[i].cells[j].textContent = '';
                        tableBody.rows[i].cells[j].contentEditable = true;
                        tableBody.rows[i].cells[j].appendChild(timeInput);
                    }
                    else{
                        tableBody.rows[i].cells[j].contentEditable = true;
                    }
                    
                }
                else if (j != 0 && j != 4 && !GLOBAL_DATA_STORE[i].isStarter && !GLOBAL_DATA_STORE[i].isTODO) {
                    // console.log(i, j)
                    tableBody.rows[i].cells[j].contentEditable = true;
  
        }}}
        enableRowClickLogging(true);

        const dateCell = document.getElementById("date-cell");
        var input = document.createElement('input');

        dateCell.textContent = '';
        input.setAttribute('type', "date");
        input.setAttribute('id', "date-picker");

        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);

        input.setAttribute('value', nextDay.toISOString().slice(0, 10));
        dateCell.appendChild(input);

        
    }
    else {
        button.textContent = "EDIT";
        setEditMode(false);

        Array.from(tableBody.rows).forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('td[contenteditable]');
            
            cells.forEach((cell, colIndex) => {

                cell.contentEditable = false; // Disable editing
                // colIndex = colIndex - 1;

                const value = cell.textContent.trim(); // Get the edited value

                if (GLOBAL_DATA_STORE[rowIndex].isStarter) {
                    // console.log("Row Index: ", rowIndex, "\nCol Index: ", colIndex, "\nValue: ", value);
                    // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2));
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].starterData.Starter = document.getElementById(`time-input-${rowIndex}`).value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].starterData.Title = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].starterData.Welcome = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].starterData.Analysis = value;
                    else if (colIndex == 4) GLOBAL_DATA_STORE[rowIndex].starterData.Solution = value;
                    // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2));
                }
                else if (GLOBAL_DATA_STORE[rowIndex].isTODO) {
                    
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].TODOdata.Business = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].TODOdata.Sub_activity = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].TODOdata.Analysis = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].TODOdata.Solution = value;
                }
                else if (colIndex >= 0) {
                    // console.log("Row Index: ", rowIndex, "\nCol Index: ", colIndex, "\nValue: ", value);
                    if (colIndex == 0) GLOBAL_DATA_STORE[rowIndex].businessData.Period_1 = value;
                    else if (colIndex == 1) GLOBAL_DATA_STORE[rowIndex].businessData.Business_1 = value;
                    else if (colIndex == 2) GLOBAL_DATA_STORE[rowIndex].businessData.Sub_activity_1 = value;
                    else if (colIndex == 3) GLOBAL_DATA_STORE[rowIndex].businessData.Period_2 = value;
                    else if (colIndex == 4) GLOBAL_DATA_STORE[rowIndex].businessData.Business_2 = value;
                    else if (colIndex == 5) GLOBAL_DATA_STORE[rowIndex].businessData.Sub_activity_2 = value;
                    else if (colIndex == 6) GLOBAL_DATA_STORE[rowIndex].businessData.Analysis = value;
                    else if (colIndex == 7) GLOBAL_DATA_STORE[rowIndex].businessData.Solution = value;
                    // console.log("Row Index: ", rowIndex, "\nCol Index: ", colIndex, "\nValue: ", value);

                }

            });
            
        });

        const datePicker = document.getElementById('date-picker');
        const dateCell = document.getElementById('date-cell');
        const selectedDate = datePicker.value;

        if (selectedDate) {
            const dateObject = new Date(selectedDate); // Convert to Date object
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            dateCell.textContent = dateObject.toLocaleDateString('en-US', options);
        }

        // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2));
        enableRowClickLogging(false);

        // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2));
        reCalculateEvents();
        getTable(false);
}}





window.edit = edit;

// Function to enable or disable row click logging
function enableRowClickLogging(rec) {
    const tableBody = document.getElementById('table-body');

    const logRowNumber = (event = null, RowNumber = null, CellNumber = null) => {

        if (event) {
            const target = event.target;
            if (target.tagName === 'TD') {

                const row = target.parentElement;

                const rowIndex = Array.from(row.parentElement.children).indexOf(row); // +1 to account for 1-based index
                const cellIndex = Array.from(row.children).indexOf(target); // 1-based index for cell

                ROW = rowIndex;
                CELL = cellIndex;

                highlightedRow(rowIndex, cellIndex);
        }
        }
        else if (RowNumber != null && CellNumber != null) {

            highlightedRow(RowNumber, CellNumber);
        }
    };

    const keyAnalyzer = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (event.ctrlKey) {
                    ROW--;
                    if (ROW < 0) ROW = tableBody.rows.length - 1;
                }
                break;
            case 'ArrowDown':
                if (event.ctrlKey) {
                    ROW++;
                    if (ROW >= tableBody.rows.length) ROW = 0;
                }
                break;
            case 'ArrowLeft':
                if (event.ctrlKey) {
                    CELL--;
                    if (CELL < 0) CELL = tableBody.rows[ROW].cells.length - 1;
                    else if (CELL == 4) CELL--;
                }
                break;
            case 'ArrowRight':
                if (event.ctrlKey) {
                    CELL++;
                    if (CELL >= tableBody.rows[ROW].cells.length) CELL = 0;
                    else if (CELL == 4) CELL++;
                }
                break;
        }
    
        logRowNumber(null, ROW, CELL);
    };


    if (rec) {
        highlightedRow(ROW, CELL);
        
        tableBody.addEventListener('click', logRowNumber);
        document.addEventListener('keydown', keyAnalyzer);
    } else {
        tableBody.removeEventListener('click', logRowNumber);
        document.removeEventListener('keydown', keyAnalyzer);
    }
}

function highlightedRow(RowNumber, cellNumber) {
    // console.log(RowNumber, cellNumber);
    const tableBody = document.getElementById('table-body');

    // Remove 'highlighted' class from all rows
    Array.from(tableBody.rows).forEach(r => r.classList.remove('highlighted'));

    // Add 'highlighted' class to the clicked row
    const row = tableBody.rows[RowNumber];
    const cell = row.cells[cellNumber];

    row.classList.add('highlighted');
    if (FOCUS) cell.focus();
}



// Ensure this function is accessible globally
window.enableRowClickLogging = enableRowClickLogging;


export function checkEdicted() {
    const dateCell = document.getElementById("date-cell");

    if (SAVED != GLOBAL_DATA_STORE) {
        if (dateCell.textContent.slice(-1) !== '*') {
            dateCell.textContent += "*";
        }
    }
    else{
        if (dateCell.textContent.slice(-1) === '*') {
            dateCell.textContent = dateCell.textContent.slice(0, -1);
        }
        return;
    }
}