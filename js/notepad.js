export var CATEGORIES = {};
// Add default categories (Modify as needed)
CATEGORIES = {
    "Meeting Decisions": [],
    "Remember": [],
    "To The Next Day": [],
    "IDEAS && Philosophy": []
};


function updateDropdown() {
    const categoryDropdown = document.getElementById("category");
    categoryDropdown.innerHTML = "";
    Object.keys(CATEGORIES).forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

export function displayEntries() {
    const entriesList = document.getElementById("entries");

    entriesList.innerHTML = "";
    Object.keys(CATEGORIES).forEach(category => {

        let numCharOfCategories = CATEGORIES[category].length;

        let listItem = document.createElement("li");
        listItem.textContent = `${category}: ${numCharOfCategories}`;
        entriesList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const categoryDropdown = document.getElementById("category");
    
    function createNotepadTags(){

        updateDropdown();
        displayEntries();
    }

    createNotepadTags();

    let previousCategory = categoryDropdown.value;

    categoryDropdown.addEventListener("change", (event) => {
        const category = event.target.value;
        const textInput = document.getElementById("textInput");
        
        CATEGORIES[previousCategory] = textInput.value;
        textInput.value = CATEGORIES[category];

        displayEntries();
        previousCategory = category;
    });
});
