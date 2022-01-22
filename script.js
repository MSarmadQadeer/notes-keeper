'use strict';

// ELEMENTS SELECTED
const input = document.querySelector("input");
const addButton = document.querySelector("#add");
const resetButton = document.querySelector("#reset");
const ul = document.querySelector("ul");

// <<<--- Beginning Point --->>>
let index = 1;
fetchItems();

// ADD, FETCH and RESET function
function addItem() {
    // ELEMENTS CREATED
    const li = document.createElement("li");
    const p = document.createElement("p");
    const span = document.createElement("span");

    // LOCAL VARIABLES
    const itemID = `item${index}`;
    const itemValue = input.value;

    // MAIN LOGIC
    input.value = "";
    p.innerText = itemValue;
    localStorage.setItem(itemID, itemValue);
    li.id = itemID;
    span.innerHTML = '<div class="close-card-btn">&times;</div>';
    span.dataset.attachedTo = itemID;
    addClickEventListenerToDeleteIcon(span);
    li.append(p);
    li.append(span);
    ul.appendChild(li);

    index++;
}

function fetchItems() {
    let countGenuineItems = 0;

    while (localStorage.getItem(`item${index}`) != null) {

        // LOCAL VARIABLES
        const itemID = `item${index}`;
        const itemValue = localStorage.getItem(`item${index}`);

        if (itemValue.length != 0) {
            countGenuineItems++;

            // ELEMENTS CREATED
            const li = document.createElement("li");
            const p = document.createElement("p");
            const span = document.createElement("span");

            // MAIN LOGIC
            p.innerText = itemValue;
            li.id = itemID;
            span.innerHTML = '<div class="close-card-btn">&times;</div>';
            span.dataset.attachedTo = itemID;
            addClickEventListenerToDeleteIcon(span);
            li.append(p);
            li.append(span);
            ul.appendChild(li);
        }

        index++;
    }

    // This check is to clear the Browser's Local Storage
    // from the dump key-value pairs 
    if (countGenuineItems == 0) reset();
}

function reset() {
    // (1)
    // This check checks that if the To-Do List is already
    // resetted than just return
    // (2)
    // Also if you remove this check than the program will
    // fall into a continous reset loop... According to the 
    // logic of the program.
    if (index == 1) return;
    index = 1;
    localStorage.clear();
    location.reload();
}


// Event Listeners
addButton.addEventListener("click", (e) => {
    if (input.value.length != 0) {
        addItem();
    }
})

input.addEventListener("keypress", (e) => {
    // keyCode of ENTER Key is 13
    if (input.value.length != 0 && e.keyCode === 13) {
        addItem();
    }
})

function addClickEventListenerToDeleteIcon(element) {
    element.addEventListener("click", function(e) {
        const itemId = element.dataset.attachedTo;
        document.getElementById(itemId).remove();
        localStorage.setItem(itemId, "");
        location.reload();
    });
}

resetButton.addEventListener("click", reset)