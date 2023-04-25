const ITEMS_CONTAINER = document.querySelector(".list");
const ITEMS_TEMPLATE = document.querySelector(".item-template");
const ADD_INPUT = document.querySelector(".input");
const REMOVE_ITEM = document.querySelector(".item-button")

let items = getItems();

function getItems () {
    const value = localStorage.getItem("todo") || "[]";

    return JSON.parse(value)
}

function setItems (items) {
    const itemsJson = JSON.stringify(items)

    localStorage.setItem("todo", itemsJson);
};

function addItem (e) {
    items.unshift({
        description: e.target.value,
        completed: false
    })

    e.target.value = ""
    setItems(items);
    showList();
}

function removeItem (item, key, value) {
    const itemIndex = items.indexOf(item)

    if (itemIndex !== -1) {
        items.splice(itemIndex, 1)
        console.log(items)
    } else {
        console.log('something wrong')
    }

    setItems(items);
    showList();
}

function updateItem (item, key, value) {
    item[key] = value;

    setItems(items);
    showList();

}

function showList () {

    ITEMS_CONTAINER.innerHTML = "";

    for (const item of items) {
        const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        const removeBtn = itemElement.querySelector(".item-button");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;
        removeBtn.value = item.description;

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value)
        })

        completedInput.addEventListener("change", () => {
            updateItem(item, "completed", completedInput.checked)
        })

        removeBtn.addEventListener("click", () => {
            removeItem(item, "description", descriptionInput.value)
        })
        
        ITEMS_CONTAINER.append(itemElement);


    } 
}

showList();

ADD_INPUT.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        addItem(e);
    }
});