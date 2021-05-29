class Task {
    constructor(task, isComplete) {
        this.task = task;
        this.isComplete = isComplete;
    }
}


const taskInput = document.getElementById('input');
const button = document.getElementById('button');
let listStatus = document.getElementById('no-task');
let tableBody = document.getElementById('table-body');


button.addEventListener('click', () => {
   
    let task = new Task(taskInput.value, false);
    addTask(task);
    taskInput.value = '';
});


function addTask(task) {
    const row = document.createElement('tr'); //creates the new row in table
    const checkboxCell = document.createElement('td'); //creates the checkbox cell for row
    let checkBox = document.createElement('input'); //create checkbox 
    checkBox.className = 'form-check-input';
    checkBox.type = 'checkbox';
    checkBox.id = 'check';

    checkboxCell.appendChild(checkBox);
    const newTask = document.createElement('td'); 
    newTask.innerHTML = task.task; //shows the new task
    row.appendChild(checkboxCell); //row will append checkbox then task 
    row.appendChild(newTask);
    tableBody.appendChild(row); //table will append row


    // checkBox.addEventListener('click', () => { //if checkbox is clicked 
    //     tableBody.removeChild(row); //remove the row
    // });

    checkBox.addEventListener('click', () => { //if checkbox is clicked 
        setTimeout(function removeTask(checkBox) { //after 300ms
            tableBody.removeChild(row); //remove the row
        }, 300);
    });
}



