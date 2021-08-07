console.log('js');

$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners()
    // load existing koalas on page load
    getTasks();
    $('#taskList').on('click', '.deleteBtn', deleteTask);
}); // end doc ready

function setupClickListeners() {
    $('#taskList').on('click', '.toggleComplete', markTaskComplete);
    $('#submitBtn').on('click', function () {

        let taskToDo = {
            description: $('#taskInput').val(),
            priority: $('#priorityInput').val(),
            
        };
        saveTask(taskToDo);
    });
}

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
        
        getTasks();
    }).catch ((error) => {
        console.log('error in POST!', error);
        alert('Unable to add task!');

    });
}

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


function renderTasks(tasks){
    let outputElement = $('#taskList');
    outputElement.empty();
    for (const task of tasks) {
        outputElement.append(`
            <tr data-id="${task.id}">
                <th>${task.description}</th>
                <th>${task.priority}</th>
                <th><button class="toggleComplete">${task.status ? "Complete": "Incomplete"}</button><th>
                <th><button class="deleteBtn"> Delete </button>
            </tr>
            `);
    }

} 

