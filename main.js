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
let completedTableBody = document.getElementById('completed-table-body');
const clear = document.getElementById('clear-button');

taskInput.addEventListener('keyup', function(event) { //this allows for enter key to be pressed
    if (event.keyCode === 13) {
        if (taskInput.value == '') {}
        else {
            let task = new Task(taskInput.value, false);
            addTask(task);
            taskInput.value = '';
        }
    }
});
button.addEventListener('click', () => {
    if (taskInput.value == '') {}
    else {
        let task = new Task(taskInput.value, false);
        addTask(task);
        taskInput.value = '';
    }
});


function addTask(task) {
    const row = document.createElement('tr'); //creates the new row in table
    const checkboxCell = document.createElement('td'); //creates the checkbox cell for row
    checkboxCell.classList.add('text-center'); //aligns checkbox into center of cell
    checkboxCell.style='width: 10%'; //makes sure that the cell takes up 10% and will always stay in place
    let checkBox = document.createElement('input'); //create checkbox 
    checkBox.className = 'form-check-input';
    checkBox.type = 'checkbox';
    checkBox.id = 'flexCheckDefault';

    checkboxCell.appendChild(checkBox);
    const newTask = document.createElement('td'); 
    newTask.classList.add('text-left'); //aligns task into left of cell
    newTask.innerHTML = task.task; //shows the new task
    row.appendChild(checkboxCell); //row will append checkbox then task 
    row.appendChild(newTask);
    tableBody.appendChild(row); //table will append row

    checkBox.addEventListener('click', () => { //if checkbox is clicked 
        removeTask(checkBox);
    });

    function removeTask(checkBox) {
        task.isComplete = true; //task that is checked off is now complete
        tableBody.removeChild(row); //remove the row that the task was on
        clear.style.display = ''; //make clear button appear
        const completedRow = document.createElement('tr'); //this is creating all of the new row with the checked off task
        const completedCheckboxCell = document.createElement('td');
        completedCheckboxCell.classList.add('text-center');
        completedCheckboxCell.style='width: 10%';
        let completedCheckBox = document.createElement('input');
        completedCheckBox.className = 'form-check-input';
        completedCheckBox.type= 'checkbox';
        completedCheckBox.id = 'flexCheckChecked';
        completedCheckBox.checked = 'checked'; //this allows the checkbox to be checked when added to completed section

        completedCheckboxCell.appendChild(completedCheckBox);
        const newCompletedTask = document.createElement('td');
        newCompletedTask.classList.add('text-left'); //aligns task into left of cell
        newCompletedTask.innerHTML = task.task; //shows the new task
        completedRow.appendChild(completedCheckboxCell); //row will append checkbox then task 
        completedRow.appendChild(newCompletedTask);
        completedTableBody.appendChild(completedRow); //table will append row

        completedCheckBox.addEventListener('click', () => { //if checkbox in completed section is clicked 
            addTask(task); //add task back to to-do section
            completedTableBody.removeChild(completedRow); //remove row from completed section
        });
    }
}

clear.addEventListener('click', () => { //if clear is pressed, loop through all children and remove them
    while (completedTableBody.firstChild) {
        completedTableBody.removeChild(completedTableBody.lastChild);
    }
    clear.style.display = 'none'; //make the clear button hidden after all completed items are cleared
});



