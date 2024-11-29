const todoForm = document.querySelector('form');
const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');
const errorMessage = document.getElementById('error-msg');

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});
//Adding task to the list
function addTask () {
    const todoText = inputField.value.trim();
    //Dispays error message if inputfield is emtpy and no elements are added to the list
    if(inputField.value == ""){
        errorMessage.style.display = "block"
        return
    }
    createTask(todoText);
    inputField.value = "";
    errorMessage.style.display = "none";
}

function createTask(task){
    const taskLI = document.createElement("li");
    todoLI.innerText = task;
    return todoLI;
}

