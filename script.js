/* 
const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');
const addButton = document.getElementById('addButton');



addButton.addEventListener('click', function() {
    if(inputField.value == ""){
        document.getElementById('error-msg').style.display = "block"
        return
    }
    document.getElementById('error-msg').style.display = "none";
    let toDo = document.createElement('li');
    toDo.classList.add('todo-task');
    toDo.innerText = inputField.value;
    listContainer.appendChild(toDo);
    inputField.value = "";
}); */

const todoForm = document.querySelector('form');
const inputField = document.getElementById('inputField');
const addButton = document.getElementById('addButton')
const todoList = document.getElementById('listContainer');

console.log(todoList)