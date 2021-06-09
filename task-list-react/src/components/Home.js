import React, { Component } from 'react'
import TaskForm from './task-components/TaskForm';
import TaskTable from './task-components/TaskTable';
import CompletedTaskTable from './task-components/CompletedTaskTable'
import Task from './task-components/task';
import 'bootstrap/dist/css/bootstrap.css';
import './task-components/styles.css';
import firebase from '../firebase/firebase';

export default class Home extends Component {

  
  
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completedTasks: []
    };
  }

  logout() {
    firebase.auth().signOut();
  }

  onTaskCreated(taskName) {
    const task = new Task(taskName, false);

    this.state.tasks.push(task);
    this.setState({
      task: this.state.tasks
    });

  }

  onTaskRemoved(task) {

    if (task.isComplete === false) {
      this.setState({
        tasks: this.state.tasks.filter(x => x.id !== task.id)
      });
     
    } else {
      this.setState({
        completedTasks: this.state.completedTasks.filter(x => x.id !== task.id)
      });
    }
  
  
    console.log(this.state.tasks);
    console.log(this.state.completedTasks);
  }

  onTaskUpdated(task) {

    if (task.isComplete) { //if a task is now completed
      for(let i = 0; i < this.state.tasks.length; i++) { //loop through the unfinished tasks
        if (this.state.tasks[i].id === task.id) { //find the task that was recently completed using id
          this.state.completedTasks.push(this.state.tasks[i]); //the completedTask array will add the task
          this.setState({
            tasks: this.state.tasks.filter(x => x.id !== task.id), //the unfinished tasks array will filter out the completed task
            completedTasks: this.state.completedTasks //completedTasks updates
          });
        }
      }
      
    } else {
      for(let i = 0; i < this.state.completedTasks.length; i++) {  //if a task is not completed anymore, loop through finished tasks
        if (this.state.completedTasks[i].id === task.id) {
          this.state.tasks.push(this.state.completedTasks[i]); //unfinished tasks array adds the task
          this.setState({
            tasks: this.state.tasks,
            completedTasks: this.state.completedTasks.filter(x => x.id !== task.id)
          });
        }
      }
    }

  }


  render() {
    return (
    
      <div>
         <div className="mb-5">
            <button onClick={() => this.logout()} className="btn btn-primary">Logout</button>
         </div>
         
        <div className="container mt-3">
          <div className="card card-body">

            <TaskForm createTask={(taskName) => this.onTaskCreated(taskName)} />

            <TaskTable 
              tasks={this.state.tasks}
              removeTask={(task) => this.onTaskRemoved(task)}
              updateTask={(task) => this.onTaskUpdated(task)}
              />
            <CompletedTaskTable 
              completedTasks={this.state.completedTasks}
              removeTask={(task) => this.onTaskRemoved(task)}
              updateTask={(task) => this.onTaskUpdated(task)}
            />
          </div>
         </div>
      </div>
    )
  }
}
