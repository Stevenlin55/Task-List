
class Task {
    constructor(id, task, isComplete) {
      this.id = id;
      this.name = task;
      this.isComplete = isComplete;
    }
  }
  

class UI {
constructor() {
    this.storage = new Storage();
    this.table = document.getElementById('table-body');
    this.completedTable = document.getElementById('completed-table-body');
    this.taskInput = document.getElementById('input');
}

async initialize() {
    this.initializeButtonListener();
    await this.storage.fetchTasksFromFireStore();
    await this.storage.fetchCompletedTasksFromFireStore();
    this.populateTasksTable();
    this.populateCompletedTasksTable();
}

initializeButtonListener() {
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    this.createTaskFromInput();
    this.clearFormInputs();
    });
}

async createTaskFromInput() {
    const taskName = this.taskInput.value;
    const task = new Task(null,taskName, false);
    await this.storage.addTask(task);
    this.populateTasksTable();
}

populateTasksTable() {
    this.clearTasksTable();

    for (const task of this.storage.tasks) {
    this.addTaskToTable(task);
    }
}

populateCompletedTasksTable() {
    this.clearCompletedTasksTable();
    for (const completedTasks of this.storage.completedTasks) {
        this.addTaskToCompletedTable(completedTasks);
    }
}

clearTasksTable() {
    let length = this.table.children.length;
    for (let i = 0; i < length; i++) {
    const row = this.table.children[0];
    row.remove();
    }
}


clearCompletedTasksTable() {
    let length = this.completedTable.children.length;
    for (let i = 0; i < length; i++) {
    const row = this.completedTable.children[0];
    row.remove();
    }
}

addTaskToTable(task) {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${this.getCheckBox(task)}</td>
    <td>${task.name}</td>
    <td>${this.getRemoveButton(task)}</td>
    `;

    this.table.append(row);
    this.addCheckboxToRow(task);
    this.addRemoveButtonToRow(task);
}

addTaskToCompletedTable(task) {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${this.getCheckBox(task)}</td>
    <td>${task.name}</td>
    <td>${this.getRemoveButton(task)}</td>
    `;

    this.completedTable.append(row);
    this.addCheckboxToRow(task);
    this.addRemoveButtonToRow(task);
}
getCheckBox(task) {
    if (task.isComplete === false) {
    return `<input width="10%" class="form-check-input" type="checkbox" id="checkbox-${task.id}">`
    } else {
    return `<input class="form-check-input" type="checkbox" id="checkbox-${task.id}" checked>`
    }
}

getRemoveButton(task) {
    return `<button type="button" class="btn btn-danger" id="remove-${task.id}" style="float:right">Remove</button>`
}

addCheckboxToRow(task) {
    document.getElementById('checkbox-'+task.id).addEventListener('click', async () => {
    task.isComplete = !task.isComplete;
    await this.storage.updateTask(task);
    this.populateTasksTable();
    this.populateCompletedTasksTable();
    })
}


addRemoveButtonToRow(task) {
    document.getElementById('remove-' + task.id).addEventListener('click', async () => {
    await this.storage.removeTask(task.id);
    this.populateTasksTable();
    })
}

clearFormInputs() {
    this.taskInput.value = '';
}
}

class Storage {
constructor() {
    this.db = firebase.firestore();
    this.tasks = [];
    this.completedTasks = [];
}

async fetchTasksFromFireStore() {
    let tasks = [];
    try {
    const snapshot = await this.db.collection('tasks').get();
    for (let doc of snapshot.docs) {
        const data = doc.data();
        const task = new Task(doc.id, data.name, data.isComplete);
        if (task.isComplete === false) {
            tasks.push(task);
        }
    }
    } catch (err) {
    console.log(err);
    }

    this.tasks = tasks;
}


async fetchCompletedTasksFromFireStore() {
    let completedTasks = [];
    try {
    const snapshot = await this.db.collection('tasks').get();
    for (let doc of snapshot.docs) {
        const data = doc.data();
        const task = new Task(doc.id, data.name, data.isComplete);
        if (task.isComplete) {
            completedTasks.push(task);
        }
    
    }
    } catch (err) {
    console.log(err);
    }

    this.completedTasks = completedTasks;
}

async addTask(task) {
    try {
    const docRef = await this.db.collection('tasks').add({
        name: task.name,
        isComplete: task.isComplete,
    });
    task.id = docRef.id;
    this.tasks.push(task);
    console.log(task)
    } catch (err) {
    console.log(err);
    }
}

async updateTask(task) {
    try {
    await this.db.collection('tasks').doc(task.id).update({
        name: task.name,
        isComplete: task.isComplete,
    });
    if (task.isComplete) {
        this.completedTasks = this.completedTasks.map(x => {
            return x.id == task.id ? task : x;
        });
        this.tasks.pop(task);
        this.completedTasks.push(task);
    }else {
        this.tasks = this.tasks.map(x => {
            return x.id == task.id ? task : x;
        });
        this.tasks.push(task);
        this.completedTasks.pop(task);
    }

    
    } catch (err) {
    console.log(err);
    }
}

async removeTask(id) {
    try {
    const taskID = this.db.collection('tasks').doc(id).id;
    let taskType = null;
    for (let tasks of this.tasks) {
        if (tasks.id == taskID) {
            taskType = tasks.isComplete;
        }
    }
    for (let tasks of this.completedTasks) {
        if (tasks.id == taskID) {
            taskType = tasks.isComplete;
        }
    }
    
    await this.db.collection('tasks').doc(id).delete();
    console.log('deted ' + taskType)
    if (taskType) {
        this.completedTasks = this.completedTasks.filter(x => x.id != id);
    }else {
        this.tasks = this.tasks.filter(x => x.id != id);
    }
   
    } catch(err) {
    console.log(err);
    }
}
}
  
  
  const ui = new UI();
  document.addEventListener('DOMContentLoaded', () => {
    ui.initialize();
  });