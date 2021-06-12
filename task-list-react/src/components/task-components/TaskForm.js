import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
export default class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  onNameChanged(e) {
    this.setState({
      name: e.target.value
    });
  }

  addTask(e) {
    e.preventDefault();
    this.props.createTask(this.state.name);
    this.setState({
      name: ''
    });
  }

  

  render() {
    return (
      <div className="task-form">
        <form onSubmit={(e) => this.addTask(e)}>
          <div className="input-group mb-3">
              <h2 className="text m-3 text-center">Add Task:</h2>
            <input onChange={(e) => this.onNameChanged(e)} value={this.state.name} type="text" className="form-control" placeholder="Task" />
            <button className="btn btn-info" type="submit">
              +
            </button>
          </div>
        </form>
      </div>
    )
  }
}