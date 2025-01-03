import {GLOBAL_DATA_STORE} from './scripts.js'



// Global Variables
var STARTER_1;
var STARTER_2;





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

    time_min = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

    return [`${starter} - ${time_min}`, time_min];
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
        title != "" ) {
            let data = {"Starter": starter,
                        "Title": title,
                        "Welcome": welcome}

            STARTER_1 = starter;
            STARTER_2 = starter;

            // Log the collected data
            console.log(JSON.stringify(data, null, 2));
            GLOBAL_DATA_STORE.push({"starterData": data})
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
          Business_1 != "") {
  
              if (Period_2 != "" &&
                  Business_2 == "") {
                      return;
                  }
  
  
  
  
              var [Events_1, NEXT_STARTER_1] = getEvents(STARTER_1, Period_1)
  
              if (Period_2 != "") {
                  var [Events_2, NEXT_STARTER_2] = getEvents(STARTER_2, Period_2)
              }
  
              else {
                  Events_2 = "";
                  NEXT_STARTER_2 = NEXT_STARTER_1;
              }
  
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
  
              // Log the collected data
              console.log(JSON.stringify(data, null, 2));
              GLOBAL_DATA_STORE.push({"businessData": data})
      }
  
  }