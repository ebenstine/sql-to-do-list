console.log('js');

$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners()
    // load existing tasks on page load
    getTasks();
    
}); // end doc ready
//establishes click listeners for buttons
function setupClickListeners() {
    $('#taskList').on('click', '.deleteBtn', deleteTask);
    $('#taskList').on('click', '.toggleTask', markTaskComplete);
    $('#submitBtn').on('click', function () {

        let taskToDo = {
            description: $('#taskInput').val(),
            priority: $('#priorityInput').val(),
            status: $('#statusInput').val()
            
            
        };
        saveTask(taskToDo);
    });
}
//get task data from the server
function getTasks(){
    console.log( 'in getTasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        renderTasks(response);
    }).catch(function(error){
        console.log('error in GET!', error);
    });
}//end getTasks
//save task information 
function saveTask(newTask){
    console.log('in saveTask', newTask);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    }).then((response) =>{
        console.log(response);
        $('#taskInput').val('')
        $('#priorityInput').val('')
        $('#statusInput').val('')
        
        getTasks();
    }).catch ((error) => {
        console.log('error in POST!', error);
        alert('Unable to add task!');

    });
}
//provides logic for the delete button
function deleteTask(){
    console.log('in deleteTask', $(this));

    const taskId = $(this).parents('tr').data('id')
    console.log(taskId);
    $.ajax ({
        type: 'DELETE',
        url: `/tasks/${taskId}`,
     }).then((response) => {
         console.log(response);
         getTasks();
     }).catch((error) => {
         console.log('error in DELETE!', error);
         alert('Unable to delete task!');
     })
}
//provides logic for the status button
function markTaskComplete(){
    let taskId = $(this).closest('tr').data().id;
    console.log('task id', taskId);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function(response){
        getTasks(response);
    }).catch(function(error){
        console.log('error in PUT!', error);
    })
}

//prints task info to the DOM and provides logic for the css class switch
function renderTasks(tasks){
    let outputElement = $('#taskList');
    outputElement.empty();
    for (const task of tasks) {
        outputElement.append(`
            <tr data-id="${task.id}">
                <th>${task.description}</th>
                <th>${task.priority}</th>
                <th><button class="${task.status ? "taskDone":"toggleTask"}">
                ${task.status ? "Finished": "To Do"}</button></th>
                
                <th><button class="deleteBtn"> Delete </button>
            </tr>
            `);
    }


} 



//Maybe I went a little light on comments in this.  I felt ok about it since I wrote the README.
c