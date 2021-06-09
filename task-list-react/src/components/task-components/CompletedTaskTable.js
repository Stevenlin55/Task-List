import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
export default class CompletedTaskTable extends Component {

  constructor(props) {
    super(props);
  }

  removeTask(task) {
    this.props.removeTask(task)
  }

  updateTask(task) {
    task.isComplete = !task.isComplete;
    this.props.updateTask(task);
  }

  render() {

    return (
      <div>   
        <h1 className="text mb-3 mt-5 text-center">Completed:</h1>
        <table className="table mt-4">
          <tbody>
            {this.props.completedTasks.map(completedTask =>
                <tr key={completedTask.id}>
                    <td><input onClick={() => this.updateTask(completedTask)}  width="10%" className="form-check-input" type="checkbox" defaultChecked></input></td>
                    <td className="text-left">{completedTask.name}</td>  
                    <td><button onClick={() => this.removeTask(completedTask)} type="button" className="btn btn-danger">Remove</button></td>    
                </tr>)}  
          </tbody>
        </table>
      </div>
    )
  }
}