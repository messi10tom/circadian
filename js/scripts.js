// Global Variables
var STARTER_1;
var STARTER_2;





function createStarter() {
    button = document.getElementById("main-button")
    if (button.textContent == "Starter") {
        // Cleaning Previous Form and Changing Button Name
        button.textContent = "Business"
        document.getElementById("form-container").innerHTML = '<div id="form-container"></div>'

        // creating Starter Form
        const fields = ['Starter', 'Title', 'Welcome']
        const ids = ['starter', 'title', 'welcome']
        const types = ['time', 'text', 'text']
        createForm("form-container", fields, ids, types, "getStarterData(event)")
    }
    else {

        // Cleaning Previous Form and Changing Button Name
        button.textContent = "Starter"
        document.getElementById("form-container").innerHTML = '<div id="form-container"></div>'

        // Creating Business Form
        const fields = ["Period", "Business", "Sub Activity", "Period", "Business", "Sub Activity"];
        const ids = ["period-1", "business-1", "sub-activity-1", "period-2", "business-2", "sub-activity-2"];
        const types = ['number', 'text', 'text', 'number', 'text', 'text']


        createForm("form-container", fields, ids, types, 'getBusinessData(event)')

    }
}


/**
 * Creates a form dynamically and appends it to the specified container.
 *
 * @param {string} container - The ID of the container element where the form will be appended.
 * @param {string[]} fields - An array of strings representing the labels for the form fields.
 * @param {string[]} ids - An array of strings representing the IDs for the form input elements.
 * @param {function} call - A callback function to be called when the form is submitted.
 *
 * @description
 * This function dynamically creates a form with the specified fields and appends it to the container element.
 * Each field consists of a label and a text input. The form also includes a submit button that triggers the
 * provided callback function when clicked.
 *
 * The function first retrieves the container element by its ID. It then creates a form element and a helper
 * function to create label and input elements. For each field, it calls the helper function to create and
 * append the label and input elements to the form. Finally, it creates a submit button, sets its attributes,
 * and appends it to the form. The form is then appended to the container element.
 */
function createForm(container, fields, ids, types, call) {
    container = document.getElementById(container);
    // Create form element
    const form = document.createElement('form');

    // Function to create label and input elements
    function createLabelInput(labelText, inputId, inputType) {
        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = labelText;
        
        const input = document.createElement('input');
        input.setAttribute('type', inputType);
        input.setAttribute('id', inputId);

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
    }

    // Create form fields
    len_fields = fields.length;
    for (let i = 0; i < len_fields; i++) {
        createLabelInput(fields[i], ids[i], types[i]);
    }

    const submitButton = document.createElement('input');

    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Submit');
    submitButton.setAttribute('onclick', call); 
    form.appendChild(submitButton);

    // Append form to body
    container.appendChild(form);
}



/**
 * Handles the form submission event, prevents the default form submission behavior,
 * retrieves the form data, and logs it to the console as a JSON string if all fields are filled.
 *
 * @param {Event} event - The event object representing the form submission event.
 */
function getStarterData(event) {
    event.preventDefault();
  

    //   Get the form data
    const starter = document.getElementById('starter').value;
    const title = document.getElementById('title').value;
    const welcome = document.getElementById('welcome').value;

    if (starter != "" && 
        title != "" && 
        welcome != "") {

        STARTER_1 = starter;
        STARTER_2 = starter;

        let data = {"Starter": starter,
                    "Title": title,
                    "Welcome": welcome
        }
        
        // Create table using the collected data
        createTable(data)
    }
}


/**
 * Handles the form submission event to gather business data from the form fields,
 * validates the input, and logs the data in JSON format if all fields are filled.
 *
 * @param {Event} event - The form submission event.
 */
function getBusinessData(event) {
  event.preventDefault();
  

//   Get the form data
    const Period_1 = document.getElementById('period-1').value;
    const Business_1 = document.getElementById('business-1').value;
    const Sub_activity_1 = document.getElementById('sub-activity-1').value;
    const Period_2 = document.getElementById('period-2').value;
    const Business_2 = document.getElementById('business-2').value;
    const Sub_activity_2 = document.getElementById('sub-activity-2').value;


    if (Period_1 != "" && 
        Business_1 != "" && 
        Sub_activity_1 != "" && 
        Period_2 != "" && 
        Business_2 != "" && 
        Sub_activity_2 != "") {



        let [Events_1, NEXT_STARTER_1] = getEvents(STARTER_1, Period_1)
        let [Events_2, NEXT_STARTER_2] = getEvents(STARTER_2, Period_2)

        STARTER_1 = NEXT_STARTER_1
        STARTER_2 = NEXT_STARTER_2

        let data = {"Event_1": Events_1,
                    "Period_1": Period_1,
                    "Business_1": Business_1,
                    "Sub_activity_1": Sub_activity_1,
                    "Event_2": Events_2,
                    "Period_2": Period_2,
                    "Business_2": Business_2,
                    "Sub_activity_2": Sub_activity_2
        }

        // Create table using the collected data
        createTable(data)
    }

}



function createTable(data) {
    var table = document.getElementById("data-table"); 

    var tr = table.insertRow();

    for (let key in data) {
        var td = tr.insertCell();
        var text = document.createTextNode(data[key]);
        td.appendChild(text);
    }

    table.appendChild(tr);
    }

/**
 * Generates an array of event times based on a starting time and an array of periods.
 *
 * @param {string} starter - The starting time in "HH:MM" format.
 * @param {number[]} periods - An array of periods in minutes to add to the starting time.
 * @returns {string[]} An array of event times in "HH:MM" format.
 */
function getEvents(starter, period) {
    
    var [hour, min] = starter.split(":");
    hour = parseInt(hour, 10);
    min = parseInt(min, 10);
    var time_min = hour * 60 + min + parseInt(period, 10);


    hour = Math.floor(time_min / 60) % 24;
    min = time_min - hour * 60;

    time_min = `${String(hour).padStart(2, '0')} : ${String(min).padStart(2, '0')}`;

    return [`${starter} - ${time_min}`, time_min];
}
