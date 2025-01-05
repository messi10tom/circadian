import {GLOBAL_DATA_STORE, defaultTable} from './scripts.js'
import {getTable} from './utils.js'



// Global Variables
var STARTER_1;
var STARTER_2;




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
            GLOBAL_DATA_STORE.push({"starterData": data,
                                    "isStarter": true,
                                    "isTODO": false
            })

            getTable();
        }
}



// Ensure this function is accessible globally
window.getStarterData = getStarterData;



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
              GLOBAL_DATA_STORE.push({"businessData": data,
                                        "isStarter": false,
                                        "isTODO": false
              })

              getTable();
      }
  
  }


// Ensure this function is accessible globally
window.getBusinessData = getBusinessData;



function getTODOdata(event) {
    event.preventDefault();
  
    // Get the form data
    const business = document.getElementById('business').value;
    const sub_activity = document.getElementById('sub-activity').value;
  
    if (business != "" ) {
  
            let data = {"TODO": "TODO: ",
                        "Business": business,
                        "Sub_activity": sub_activity}
  
            // Log the collected data
            console.log(JSON.stringify(data, null, 2));
            GLOBAL_DATA_STORE.push({"TODOdata": data,
                                    "isStarter": false,
                                    "isTODO": true
            })

            getTable();
        }
  }




// Ensure this function is accessible globally
window.getTODOdata = getTODOdata;



function saveDataStore() {
    if (GLOBAL_DATA_STORE.length == 0) return;

    const dataStr = JSON.stringify(GLOBAL_DATA_STORE);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'data_store.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}



// Ensure this function is accessible globally
window.saveDataStore = saveDataStore;



export function loadFile() {
    const fileInput = document.getElementById('file-input');
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const json = JSON.parse(content);
                GLOBAL_DATA_STORE.length = 0; // Clear the array
                GLOBAL_DATA_STORE.push(...json); // Populate the array with new data
                getTable(); // Update the table
            };
            reader.readAsText(file);
        }
    });
}



// Ensure this function is accessible globally
window.loadFile = loadFile;



function convertToCheckBox() {
    const table = document.getElementById('data-table');
    const rows = table.rows;
    const numROWS = table.rows.length;
    const numDataEntries = GLOBAL_DATA_STORE.length;

    if (numDataEntries == 0) return

    for (let i = 0; i < numROWS; i++) {

        if (i < 2) {
            const cell = rows[i].insertCell(0);
            cell.classList.add('checkbox-column');
        }
        
        else {
            const cell = rows[i].insertCell(0);
            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('id', `checkbox-${i}`);
            checkBox.setAttribute('onclick', `getCheckBoxData(${i})`);
            cell.appendChild(checkBox);

            cell.classList.add('checkbox-column');
        }
    }
}

var CHECKBOX_LIST = [];

function getCheckBoxData(row) {
    
    if (CHECKBOX_LIST.includes(row)) {
        CHECKBOX_LIST = CHECKBOX_LIST.filter(item => item !== row);

    } else {
        CHECKBOX_LIST.push(row);
    }
}

function clearCheckBox() {
    const table = document.getElementById('data-table');
    document.getElementById('table-body').innerHTML = "";
    const rows = table.rows;

    for (let i = 0; i < 2; i++) {
        rows[i].deleteCell(0); // Delete the first cell in each row
    }

    defaultTable();
}

function clearDataStore() {
    const button = document.getElementById("remove-button");
    // const table = document.getElementById('data-table');

    if (button.textContent == "Remove") {

        button.textContent = "Select";
        convertToCheckBox();
    }
    else {
   
        button.textContent = "Remove";
        CHECKBOX_LIST.sort((a, b) => b - a);
        for (let i = 0; i < CHECKBOX_LIST.length; i++) {
            // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2))
            GLOBAL_DATA_STORE.splice(CHECKBOX_LIST[i] - 2, 1);

        }
        // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2))
        CHECKBOX_LIST = [];
        clearCheckBox();
        getTable();
    }

}




// Ensure this function is accessible globally
window.clearDataStore = clearDataStore;
window.getCheckBoxData = getCheckBoxData;