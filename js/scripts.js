function getData(event) {
  event.preventDefault();
  

//   Get the form data
    const Events_1 = document.getElementById('events_1').value;
    const Period_1 = document.getElementById('period_1').value;
    const Business_1 = document.getElementById('business_1').value;
    const Sub_activity_1 = document.getElementById('sub_activity_1').value;
    const Events_2 = document.getElementById('events_2').value;
    const Period_2 = document.getElementById('period_2').value;
    const Business_2 = document.getElementById('business_2').value;
    const Sub_activity_2 = document.getElementById('sub_activity_2').value;


    if (Events_1 != "" && 
        Period_1 != "" && 
        Business_1 != "" && 
        Sub_activity_1 != "" && 
        Events_2 != "" && 
        Period_2 != "" && 
        Business_2 != "" && 
        Sub_activity_2 != "") {

        let data = {"Event_1": Events_1,
                    "Period_1": Period_1,
                    "Business_1": Business_1,
                    "Sub_activity_1": Sub_activity_1,
                    "Event_2": Events_2,
                    "Period_2": Period_2,
                    "Business_2": Business_2,
                    "Sub_activity_2": Sub_activity_2
        }
        createTable(data);
    }

}

function createTable(data) {
    var table = document.getElementById('data-table');
    var tr = table.insertRow();
    for (let key in data) {
        var td = tr.insertCell();
        var text = document.createTextNode(data[key]);
        td.appendChild(text);
    }
    table.appendChild(tr);
}