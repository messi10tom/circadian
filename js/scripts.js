import { createForm } from './utils.js';

export var GLOBAL_DATA_STORE = [];
/**
 * Nomenclature:
 * - Starter: The time at which the schedule starts.
 *    - eg: The time at which waking up; 5:00AM.
 * - Business: The main activity that is being done.
 *   - eg: Work, School, etc.
 */

export function defaultTable() {
    const tableBody = document.getElementById('table-body');
        for (let i = 0; i < 30; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
    }
}

defaultTable();

// Get the date in desired format
const nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 1);
const options = { day: '2-digit', month: 'long', year: 'numeric' };
export var formattedDate = nextDay.toLocaleDateString('en-GB', options);

const dateCell = document.getElementById("date-cell");
dateCell.textContent = formattedDate; // Set the date text


/**
 * Creates a form with specified fields, ids, and types, and appends it to a container element.
 * @param {string} fields
 *              - Starter: The time at which the schedule starts.
 *              - Title: The title of the schedule.
 *              - Welcome(Optional): The welcome message.
 * @param {string} ids
 *             - starter: ID for Starter form.
 *             - title: ID for Title form.
 *             - welcome: ID for Welcome form.
 * @param {string} types
 */
let fields = ['Starter    :  ',
              'Title        :  ',
              'Welcome :  '];
let ids = ['starter', 'title', 'welcome']
let types = ['time', 'text', 'text']

createForm("form-container", 
           fields, 
           ids, 
           types, 
           "STARTER", 
           "getStarterData(event)")


/**
* Creates a form with specified fields, ids, and types, and appends it to a container element.
* @param {string} fields
*              - Period: The period of the business.
*              - Business: The name of the Business.
*              - Sub Activity(Optional): The sub activity of the business.
* @param {string} ids
* @param {string} types             
*/


fields = ["Period          :  ", 
          "Business       :  ", 
          "Sub Activity :  "];
ids = ["period-1", "business-1", "sub-activity-1"];
types = ['number', 'text', 'textarea'];

createForm("form-container",
           fields,
           ids,
           types,
           "BUSINESS 1",
           "getBusinessData(event)");

ids = ["period-2", "business-2", "sub-activity-2"];

createForm("form-container",
           fields, 
           ids, 
           types, 
           "BUSINESS 2");


fields = ["Business       :  ", 
          "Sub Activity :  "];
ids = ["business", "sub-activity"];
types = ['text', 'textarea'];

createForm("form-container",
    fields, 
    ids, 
    types, 
    "TODO",
    "getTODOdata(event)",
    2);

