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

    this.db = firebase.firestore();

    this.state = {
      tasks: [],
      completedTasks: []
    };
  }

  componentDidMount(){
    this.fetchTasksFromFirebase();
  }

  async fetchTasksFromFirebase() {
    try {
      const userId = this.props.user.uid;
      const snapshot = await this.db.collection('tasks').where('userId', '==', userId).get();
      console.log(snapshot)
      const allTasks = snapshot.docs.map(doc => Task.fromFirebaseDoc(doc));
      const incompleteTasks = allTasks.filter(x => x.isComplete === false);
      const completeTasks = allTasks.filter(x => x.isComplete === true);

      this.setState({ tasks: incompleteTasks});
      this.setState({ completedTasks: completeTasks});
    }catch(err) {
      console.log(err);
    }
  }

  logout() {
    firebase.auth().signOut();
  }

  async onTaskCreated(taskName) {
    try{
      const userId = this.props.user.uid;
      const task = Task.fromData(taskName,userId, false);
      //save to firebase 
      const ref = await this.db.collection('tasks').add({ //needed the await cuz you want to finish adding the task to server before moving on
        userId: task.userId,
        name: task.name,
        isComplete: task.isComplete,
      })

      task.id = ref.id;
    
      this.state.tasks.push(task);
      this.setState({
        task: this.state.tasks
      });
    }catch(err) {
      console.log(err);
    }
  
  }
 

  async onTaskRemoved(task) {

    try{
      if (task.isComplete === false) {
        this.setState({
          tasks: this.state.tasks.filter(x => x.id !== task.id)
        });
      
      } else {
        this.setState({
          completedTasks: this.state.completedTasks.filter(x => x.id !== task.id)
        });
      }
     await this.db.collection('tasks').doc(task.id).delete();
  
    }catch(err) {
      console.log(err);
    }
  

  
  }

  async onTaskUpdated(task) {

    try{
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
      await this.db.collection('tasks').doc(task.id).update({
        name: task.name,
        isComplete: task.isComplete
      });
  
    }catch(err) {
      console.log(err);
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
