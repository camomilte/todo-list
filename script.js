/* To Do:
    - Must only be text
    - Max length of ???
    - Must not render as HTML
*/

const inputField = document.getElementById('inputField');
const toDoContainer = document.getElementById('toDoContainer');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function() {
    var toDo = document.createElement('p')
    toDo.innerText = inputField.value;
    toDoContainer.appendChild(toDo)
});