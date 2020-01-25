let todoArr = [];

class ToDo {
    constructor(item, isComplete = false) {
        this.item = item;
        this.completed = isComplete;
    }
    toggleComplete() {
        this.completed = !this.completed;
    }
}

let newTodoItemBtn = document.getElementById("create-todo");
let newTodoInput = document.getElementById("todo-input");
let todoListItems = document.getElementById("todo-list-items");
let removeButtons = document.getElementById("remove-buttons")

let showAllBtn = document.getElementById("show-all");
let showPendingBtn = document.getElementById("show-pending");
let showCompletedBtn = document.getElementById("show-completed");

newTodoItemBtn.addEventListener("click", function () {
    if (newTodoInput.value != "") {
        let newTodoItem = new ToDo(newTodoInput.value);
        todoArr.push(newTodoItem);
        newTodoInput.value = '';
        showListItems(todoArr);
        showRemoveButtons(todoArr);
    }
    else {
        alert("Input Cannot Be Empty")
    };
    console.log(todoArr);
})

showListItems = function (arr) {
    todoListItems.innerHTML = '';
    let i = 0;
    arr.forEach(ele => {
        var item = document.createElement("li");
        item.setAttribute("class", "list-group-item text-center");
        if (ele.completed) {
            item.setAttribute("class", "striked-through list-group-item text-center align-middle");
        }
        item.setAttribute("onclick", `strikeThrough(${i})`);
        item.textContent = ele.item;
        todoListItems.appendChild(item);
        i++;
    });
}

showRemoveButtons = function (arr) {
    removeButtons.innerHTML = '';
    let i = 0;
    arr.forEach(ele => {
        var btn = document.createElement("button");
        btn.setAttribute("onclick", `removeItem(${i})`);
        btn.setAttribute("class", "btn btn-danger mt-2 mb-1")
        btn.innerHTML = "remove";
        removeButtons.appendChild(btn);
        i++;
    })

}

strikeThrough = function (uid) {
    let listItems = document.querySelectorAll("#todo-list-items > li");
    listItems[uid].setAttribute("class", "striked-through list-group-item text-center");
    todoArr[uid].toggleComplete();
    console.log("hi");
}

removeItem = function (uid) {
    todoArr.splice(uid, 1);
    showListItems(todoArr);
    showRemoveButtons(todoArr);
}

showAllBtn.addEventListener("click", function () {
    showListItems(todoArr);
    showRemoveButtons(todoArr);
})

showPendingBtn.addEventListener("click", function () {
    let pendingArr = todoArr.filter(ele => ele.completed == false);
    showRemoveButtons(pendingArr);
    showListItems(pendingArr);
})

showCompletedBtn.addEventListener("click", function () {
    let pendingArr = todoArr.filter(ele => ele.completed == true);
    showRemoveButtons(pendingArr);
    showListItems(pendingArr);
})