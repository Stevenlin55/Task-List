import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
export default class TaskTable extends Component {

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
        <h1 className="text mb-3 mt-5 text-center">To Do:</h1>
        <table className="table mt-4">
          <tbody>
            {this.props.tasks.map(task => 
            <tr key={task.id}>
                <td><input onClick={() => this.updateTask(task)} width="10%" className="form-check-input" type="checkbox"></input></td>
                <td className="text-left">{task.name}</td>
                <td><button onClick={() => this.removeTask(task)} type="button" className="btn btn-danger">Remove</button></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}