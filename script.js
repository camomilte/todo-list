const todoForm = document.querySelector('form');
const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');
const errorMessage = document.getElementById('error-msg');

//Fetch API

let allTasks = [];

//Insert your API key between the quotationmarks
const APIkey = "";
const URL = `https://js1-todo-api.vercel.app/api/todos?apikey=${APIkey}`;

// /
// Is executed when the page is loadeds
// /
window.onload = () => {

};

//Fetch data from API
/* fetch(URL, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        "title": "Laga mat",
        "completed": false,
    }),
})
    .then ((res) => res.json())
    .then((json) => console.log(json))
    
    .catch(err => {
        console.log(err);
    }) */


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
    allTasks.push(todoText);
    createTask(todoText);
    updateList();
    //Emptying the input field
    inputField.value = "";
    //Hide the error message if input field is not empty
    errorMessage.style.display = "none";
}

//Function for creating new tasks
function createTask(task, taskIndex){
    const taskID = "todo-"+taskIndex;
    const taskLI = document.createElement("li");
    taskLI.className = "todo-task";
    taskLI.innerHTML = `
        <input type="checkbox" id="${taskID}">
        <label for="${taskID}" class="checkbox">
            <i class="fa-solid fa-check"></i>
        </label>
        <label for="${taskID}" class="task-value">${task}</label>
        <button class="delete-btn">
            <i class="fa-regular fa-trash-can"></i>
        </button>`
    return taskLI;
}

//Updating the list
function updateList (){
    listContainer.innerHTML = ""; 
    allTasks.forEach((task, taskIndex)=>{
        taskItem = createTask(task, taskIndex);
        listContainer.append(taskItem);
    })    

}

