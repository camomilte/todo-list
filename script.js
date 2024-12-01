const todoForm = document.querySelector('form');
const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');
const errorMessage = document.getElementById('error-msg');

//Fetch API

let allTasks = [];

//Insert your API key between the quotationmarks
const APIkey = "";

// /
// Is fired when the window is loaded
// /
window.onload = async () => {

    // We want to load all todos here => 

    // Fetch all todos from the api
    await fetchAllTasks();
    // Update the task list
    updateList();
}

todoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    await addTask();
});

//Adding task to the list
async function addTask () {
    const todoText = inputField.value.trim();
    //Dispays error message if inputfield is emtpy and no elements are added to the list
    if(inputField.value == ""){
        errorMessage.style.display = "block"
        return
    }

    // Create the task in the database
    task = await createTask({
        "title": todoText,
        "completed": false
    });

    // Push the task to the task array
    allTasks.push(task);
    // Create the task list item
    createTaskListItem(task);
    // Update the task list
    updateList();
    //Emptying the input field
    inputField.value = "";
    //Hide the error message if input field is not empty
    errorMessage.style.display = "none";
}

// /
// Creates a new task in the database
// /
async function createTask(task) {
    // Create the task
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos?apikey=${APIkey}`, {
        method: 'POST',
        body: JSON.stringify(task)
    });

    if(response.status != 201) {
        // If the task could not be created

        // Show error message
        alert("Task could not be created");
        // Do not continue
        return;
    }

    // Return the task
    return await response.json();
} 

// /
// Create a task list item
// /
function createTaskListItem(task){

    // Variable declerations =>

    // The task list item
    const taskLI = document.createElement("li");

    // Set the list item class name
    taskLI.className = "todo-task";
    // Create the completed checkbox based on the completed flag
    taskLI.innerHTML = (task.completed) ? `<input type="checkbox" id="${task._id}" checked />` 
                                        : `<input type="checkbox" id="${task._id}" />`;
    // Create the rest of the list item
    taskLI.innerHTML +=
        `<label for="${task._id}" class="checkbox">
            <i class="fa-solid fa-check"></i>
        </label>
        <label for="${task._id}" class="task-value">${task.title}</label>
        <button for="${task._id}" id="del-${task._id}" class="delete-btn">
            <i class="fa-regular fa-trash-can"></i>
        </button>`

    // Return the list item
    return taskLI;
}

// /
// Delete a task from the database
// /
async function deleteTask(taskId) {
    // Delete the task from the database
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${taskId}?apikey=${APIkey}`,
        {
            method: 'DELETE'
        }
    );

    if(response.status != 200) {
        // If the task could not be deleted

        // Show error message
        alert("Task could not be deleted");
        // Do not continue
        return;
    }

    // Find the task in the local array that was deleted
    deletedTask = allTasks.find(task => { return task._id == taskId });
    // Remove the task from the local array
    allTasks.splice(allTasks.indexOf(deletedTask), 1);
}

// /
// Update a task in the database
// /
async function updateTask(task) {
    // Update the task
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${task._id}?apikey=${APIkey}`, 
        {
            method: 'PUT',
            body: JSON.stringify(task)
        }
    );

    if(response.status != 200) {
        // If the task could not be updated

        // Show error message
        alert("Task could not be updated");
        // Do not continue
        return;
    }
}

// /
// Is fired when a task is clicked on
// /
async function changeTaskStatus(task) {
    // Set the new completed status of the task
    task.completed = !task.completed
    // Update the task
    await updateTask(task);
}

// /
// Updating the task list
// /
function updateList (){
    // Clear the html ul (Task list)
    listContainer.innerHTML = ""; 

    allTasks.forEach(task => {
        // Update the task list

        // Create the task from the current todo
        taskItem = createTaskListItem(task);
        // Append the todo to the html ul
        listContainer.append(taskItem);
        // Add the clicked event to the list item checkbox
        document.getElementById(task._id).addEventListener("click", async () => { await changeTaskStatus(task); });
        // Add the clicked event for the delete task button
        document.getElementById(`del-${task._id}`).addEventListener("click", async () => { await deleteTask(task._id); updateList(); });
    })    
}

// /
// Fetches all todos from the api
// /
async function fetchAllTasks() {

    // Fetch all tasks from the api
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos?apikey=${APIkey}`);

    if (response.status != 200) {
        // If we did not get an Ok status from the api

        // Show error message
        alert("Could not load todos");
        // Do not continue
        return;
    }

    // Get the data from the response
    const todos = await response.json();

    todos.forEach(todo => {
        // Loop through all todos returned from the api

        // Add the todo to the array
        allTasks.push(todo);
    });
}
