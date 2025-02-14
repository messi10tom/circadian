import {GLOBAL_DATA_STORE, defaultTable} from './scripts.js'
import {getTable, ROW, checkEdicted} from './utils.js'
import {CATEGORIES, displayEntries} from './notepad.js'



// Global Variables
var STARTER_1;
var STARTER_2;
export var EDITMODE = false;

export function setEditMode(value) {EDITMODE = value;}



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
    min = (time_min - hour * 60) % 60;

    time_min = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

    return [`${starter} - ${time_min}`, time_min];
}



function getPeriod(starter, ender) {
    
    var [hour, min] = starter.split(":");
    const Sdate = new Date();
    Sdate.setHours(hour, min, 0, 0); // Set hours, minutes, seconds, and milliseconds

    [hour, min] = ender.split(":");
    const Edate = new Date();
    Edate.setHours(hour, min, 0, 0); // Set hours, minutes, seconds, and milliseconds

    // Calculate the difference in milliseconds
    const differenceMs = Edate - Sdate;

    // Convert to minutes
    return Math.floor(differenceMs / (1000 * 60));
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
                        "Welcome": welcome,
                        "Analysis": '',
                        "Solution": ''}

            STARTER_1 = starter;
            STARTER_2 = starter;

            // Log the collected data
            console.log(JSON.stringify(data, null, 2));
            if (EDITMODE && ROW <= GLOBAL_DATA_STORE.length) {
                GLOBAL_DATA_STORE.splice(ROW + 1, 0, {"starterData": data,
                                                    "isStarter": true,
                                                    "isTODO": false
                                                })
            }
            else {
                GLOBAL_DATA_STORE.push({"starterData": data,
                                        "isStarter": true,
                                        "isTODO": false
                })
            }

            getTable(EDITMODE);
        }

    checkEdicted();
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
      let Period_1 = document.getElementById('period-1').value;
      const Business_1 = document.getElementById('business-1').value;
      const Sub_activity_1 = document.getElementById('sub-activity-1').value;
      let Period_2 = document.getElementById('period-2').value;
      const Business_2 = document.getElementById('business-2').value;
      const Sub_activity_2 = document.getElementById('sub-activity-2').value;
  
  /**   We need Period_1 && Business_1 or Period_2 && Business_2 or both 
   * Mathematically, this is equivalent to (Period_1 && Business_1) || (Period_2 && Business_2)
  */
      if ((Period_1 && Business_1) || (Period_2 && Business_2)) {
        var Pdrop_1 = document.getElementById('period-1-dropdown').value;
        var Pdrop_2 = document.getElementById('period-2-dropdown').value;

        if (Period_1 != "") {

            if (Pdrop_1 == "time") Period_1 = getPeriod(STARTER_1, Period_1);
            if (EDITMODE == false || ROW == GLOBAL_DATA_STORE.length) {
                var [Events_1, NEXT_STARTER_1] = getEvents(STARTER_1, Period_1);
            }
            else {
                if (GLOBAL_DATA_STORE[ROW].isStarter) {
                    let starter = GLOBAL_DATA_STORE[ROW].starterData.Starter;
                    var [Events_1, NEXT_STARTER_1] = getEvents(starter, Period_1);
                    NEXT_STARTER_1 = null;
                }
                else if (GLOBAL_DATA_STORE[ROW].isTODO) {
                    for (let i = ROW; i >= 0; i--) {
                        if (GLOBAL_DATA_STORE[i].isStarter) {
                            let starter = GLOBAL_DATA_STORE[i].starterData.Starter;
                            var [Events_1, NEXT_STARTER_1] = getEvents(starter, Period_1);
                            NEXT_STARTER_1 = null;
                            break;
                        }
                        else if (!GLOBAL_DATA_STORE[i].isTODO && !GLOBAL_DATA_STORE[i].isStarter) {
                            let starter = GLOBAL_DATA_STORE[i].businessData.Event_1.split(' - ')[1];
                            var [Events_1, NEXT_STARTER_1] = getEvents(starter, Period_1);
                            NEXT_STARTER_1 = null;
                            break;
                        }
                    }
                    // let starter = GLOBAL_DATA_STORE[ROW].starterData.Starter;
                    // var [Events_1, NEXT_STARTER_1] = getEvents(starter, Period_1);
                    NEXT_STARTER_1 = null;
                }
                else {
                    let starter = GLOBAL_DATA_STORE[ROW].businessData.Event_1.split(' - ')[1];
                    var [Events_1, NEXT_STARTER_1] = getEvents(starter, Period_1);
                    NEXT_STARTER_1 = null;
                }
            }
        }
        else {
            Events_1 = "";

        }

            if (Period_2 != "") {
                if (Pdrop_2 == "time") Period_2 = getPeriod(STARTER_2, Period_2);
                console.log(STARTER_1, Period_1);
                var [Events_2, NEXT_STARTER_2] = getEvents(STARTER_2, Period_2);
            }

            else {
                Events_2 = "";
                NEXT_STARTER_2 = NEXT_STARTER_1;
            }

            if (NEXT_STARTER_1) STARTER_1 = NEXT_STARTER_1;
            if (NEXT_STARTER_2) STARTER_2 = NEXT_STARTER_2;

            let data = {"Event_1": Events_1,
                        "Period_1": Period_1,
                        "Business_1": Business_1,
                        "Sub_activity_1": Sub_activity_1,
                        "Event_2": Events_2,
                        "Period_2": Period_2,
                        "Business_2": Business_2,
                        "Sub_activity_2": Sub_activity_2,
                        "Analysis": '',
                        "Solution": ''
            }

            // Log the collected data
            console.log(JSON.stringify(data, null, 2));
            if (EDITMODE && ROW <= GLOBAL_DATA_STORE.length) {
                GLOBAL_DATA_STORE.splice(ROW + 1, 0, {"businessData": data,
                                                    "isStarter": false,
                                                    "isTODO": false
                                                })
            }
            else {
                GLOBAL_DATA_STORE.push({"businessData": data,
                    "isStarter": false,
                    "isTODO": false
})};

            getTable(EDITMODE);
      }

    checkEdicted();
  
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
                        "Sub_activity": sub_activity,
                        "Analysis": '',
                        "Solution": ''}
  
            // Log the collected data
            console.log(JSON.stringify(data, null, 2));
            if (EDITMODE && ROW <= GLOBAL_DATA_STORE.length) {
                GLOBAL_DATA_STORE.splice(ROW + 1, 0, {"TODOdata": data,
                                                    "isStarter": false,
                                                    "isTODO": true
                                                })
            }
            else {
                GLOBAL_DATA_STORE.push({"TODOdata": data,
                    "isStarter": false,
                    "isTODO": true
                })}

            getTable(EDITMODE);
        }

    checkEdicted();
  }


// Ensure this function is accessible globally
window.getTODOdata = getTODOdata;

export var SAVED = [];

function saveDataStore() {
    if (GLOBAL_DATA_STORE.length == 0) return;
    SAVED = GLOBAL_DATA_STORE;

    const dataToSave = {"Date": document.getElementById("date-cell").textContent,
                        "ScheduleRow": GLOBAL_DATA_STORE,
                        "NotePad": CATEGORIES
    };

    const dataStr = JSON.stringify(dataToSave);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = dataToSave["Date"];

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    checkEdicted();
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

                GLOBAL_DATA_STORE.push(...json["ScheduleRow"]); // Populate the array with new data
                document.getElementById("date-cell").textContent = json["Date"];

                // Clear existing properties
                for (const key in CATEGORIES) {
                    if (CATEGORIES.hasOwnProperty(key)) {
                        delete CATEGORIES[key];
                    }
                }

                // Assign new properties
                Object.assign(CATEGORIES, json["NotePad"]);
                displayEntries(document.getElementById("entries"));

                const textInput = document.getElementById("textInput");
                textInput.value = CATEGORIES[document.getElementById("category").value];

                // Updating the starter variables.

                if (GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].isStarter) {
                    STARTER_1 = GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].starterData.Starter;
                    STARTER_2 = GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].starterData.Starter;
                }
                else if (!GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].isTODO) {
                    STARTER_1 = GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].businessData.Event_1.split(' - ')[1];
                    if (GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].businessData.Event_2) {
                        STARTER_2 = GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].businessData.Event_2.split(' - ')[1];
                    }
                    else {
                        STARTER_2 = STARTER_1;
                    }
                }
                else if (GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 1].isTODO) {
                    for (let i = GLOBAL_DATA_STORE.length - 2; i > 0 ; i--) {

                        if (GLOBAL_DATA_STORE[i].isStarter) {
                            STARTER_1 = GLOBAL_DATA_STORE[i].starterData.Starter;
                            STARTER_2 = GLOBAL_DATA_STORE[i].starterData.Starter;
                            break;
                        }
                        else if (!GLOBAL_DATA_STORE[i].isTODO) {
                            STARTER_1 = GLOBAL_DATA_STORE[i].businessData.Event_1.split(' - ')[1];
                            if (GLOBAL_DATA_STORE[i].businessData.Event_2) {
                                STARTER_2 = GLOBAL_DATA_STORE[i].businessData.Event_2.split(' - ')[1];
                                break;
                            }
                            else {
                                STARTER_2 = STARTER_1;
                                break;
                            }
                        }
                    }
                }
                getTable(EDITMODE); // Update the table
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


    for (let i = 0; i < rows.length; i++) {

        if (i < 2) {
            const cell = rows[i].insertCell(0);
            cell.classList.add('checkbox-column');
        }
        
        else {
            const cell = rows[i].insertCell(0);
            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            // checkBox.setAttribute('id', `checkbox-${i}`);
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

    if (GLOBAL_DATA_STORE.length == 0) return

    if (button.textContent == "REMOVE") {

        button.textContent = "SELECT";
        convertToCheckBox();
    }
    else {
   
        button.textContent = "REMOVE";
        CHECKBOX_LIST.sort((a, b) => b - a);
        for (let i = 0; i < CHECKBOX_LIST.length; i++) {
            // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2))

            console.log(CHECKBOX_LIST)
            if (CHECKBOX_LIST[i] - 1 == GLOBAL_DATA_STORE.length) {
                
                let lastEvent = GLOBAL_DATA_STORE[GLOBAL_DATA_STORE.length - 2];
                console.log(JSON.stringify(lastEvent, null, 2));

                if (lastEvent.isStarter) {
                    STARTER_1 = lastEvent.starterData.Starter
                }
                else if (!lastEvent.isTODO) {
                    STARTER_1 = lastEvent.businessData.Event_1.split(' - ')[1];
                    if (lastEvent.businessData.Event_2 != "") {
                        let lastEvent_2 = lastEvent.businessData.Event_2;
                        STARTER_2 = lastEvent_2.split(' - ')[1];
                    }
                }

            }

            GLOBAL_DATA_STORE.splice(CHECKBOX_LIST[i] - 2, 1);

        }
        // console.log(JSON.stringify(GLOBAL_DATA_STORE, null, 2))
        CHECKBOX_LIST = [];
        clearCheckBox();
        reCalculateEvents();
        getTable(EDITMODE);
    }

}

function sectioning(idx) {
    let section = [[GLOBAL_DATA_STORE[idx], idx]];
    for (var i = idx; i < GLOBAL_DATA_STORE.length; i++) {
        if (GLOBAL_DATA_STORE[i].isStarter) {
            if (section.length == 1) continue;
            break;
        }
        else if(!GLOBAL_DATA_STORE[i].isTODO) {
            section.push([GLOBAL_DATA_STORE[i], i])
        }
    }

    return [section, i]
}

export function reCalculateEvents() {
    var [idx, section] = [0, []];
    while (idx < GLOBAL_DATA_STORE.length){
        [section, idx] = sectioning(idx++);

        if (section.length == 1) continue;

        // console.log(JSON.stringify(section, null, 2));
        var starter_1 = section[0][0].starterData.Starter;  // 13:00
        var starter_2 = starter_1; // 13:00
        for (let j = 1; j < section.length; j++) {
            let businessData = section[j][0].businessData;
            let period_1 = businessData.Period_1; // 5
            let period_2 = businessData.Period_2; // 15

            let [event_1, next_starter_1] = getEvents(starter_1, period_1); // 13:00 - 13:05, 13:05
            businessData.Event_1 = event_1;
            starter_1 = next_starter_1;

            if (period_2 != "") {
                let [event_2, next_starter_2] = getEvents(starter_2, period_2); // 13:00 - 13:15, 13:15
                businessData.Event_2 = event_2;
                starter_2 = next_starter_2;
            } else {
                businessData.Event_2 = "";
                starter_2 = next_starter_1; 
            }

            GLOBAL_DATA_STORE[section[j][1]].businessData = businessData;
        }
    }
}




// Ensure this function is accessible globally
window.clearDataStore = clearDataStore;
window.getCheckBoxData = getCheckBoxData;
