'use strict';

// ELEMENTS SELECTED
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// <<<--- Beginning Point --->>>
let data = {
    'items': []
};

fetchItems();
input.focus()

// ADD, FETCH and RESET function
function addItem() {
    data['items'].push(input.value);
    input.value = "";
    localStorage.setItem('data', JSON.stringify(data));
    location.reload();
}

function fetchItems() {
    if (localStorage.getItem(`data`) != null) {
        data = JSON.parse(localStorage.getItem(`data`));

        data['items'].forEach((element, index) => {
            // ELEMENTS CREATED
            const li = document.createElement("li");
            const p = document.createElement("p");
            const span = document.createElement("span");

            // MAIN LOGIC
            p.innerText = element;
            li.id = index;
            span.innerHTML = '<div class="close-card-btn">&times;</div>';
            li.append(p);
            li.append(span);
            ul.appendChild(li);
        });
    }
}

function reset() {
    localStorage.clear();
    location.reload();
}

function deleteItem(index) {
    data['items'].splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    location.reload();
}

// Event Listeners
input.addEventListener("keypress", (e) => {
    // keyCode of ENTER Key is 13
    if (input.value.length != 0 && e.keyCode === 13) {
        addItem();
    }
})

window.addEventListener('click', (e) => {
    if (e.target.closest('span')) {
        const index = e.target.closest('span').parentElement.id;
        deleteItem(index);
    }
    else if (e.target.closest('#reset')) {
        reset();
    }
    else if (e.target.closest('#add')) {
        addItem();
    }
})
