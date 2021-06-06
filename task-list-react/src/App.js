import { Component } from 'react';

import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import CompletedTaskTable from './components/CompletedTaskTable'
import Task from './models/task';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      completedTasks: []
    };
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
    console.log(task.isComplete)
    if (task.isComplete) {  
      for(let i = 0; i < this.state.tasks.length; i++) {
        if (this.state.tasks[i].id === task.id) {
          this.state.completedTasks.push(this.state.tasks[i]);
          this.setState({
            tasks: this.state.tasks.filter(x => x.id !== task.id),
            completedTasks: this.state.completedTasks
          });
        }
      }
      
    } else {
      for(let i = 0; i < this.state.completedTasks.length; i++) {
        if (this.state.completedTasks[i].id === task.id) {
          this.state.tasks.push(this.state.completedTasks[i]);
          this.setState({
            tasks: this.state.tasks,
            completedTasks: this.state.completedTasks.filter(x => x.id !== task.id)
            //tasks: this.state.tasks.filter(x => x.id !== task.id),
            //completedTasks: this.state.completedTasks
          });
        }
      }
    }

  }

  render() {
    return (
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
    );
  }
}

export default App;
