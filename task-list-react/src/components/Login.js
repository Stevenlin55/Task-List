import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import firebase from '../firebase/firebase';
import './routing.css';
export default class Login extends Component {

  constructor(props) {
    super(props);
    
    if (this.props.user) {
      this.props.history.push('/');
    }

    this.auth = firebase.auth();
    this.state = {
      email: '',
      password: '',
    }
  }

  onEmailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }

  onPasswordChanged(e) {
    this.setState({
      password: e.target.value
    });
  }

  async login(e) {
    e.preventDefault();

    try {
      const { email, password } = this.state;

      await this.auth
        .signInWithEmailAndPassword(email, password);

      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (

      <body>
      <div className="body pb-5">
        <div className="container bg-secondary mt-5">
          <form  onSubmit={(e) => this.login(e)}>

            <h1 className="h3 text mb-3 text-center">Login</h1>
            <div>
              <label className="form-label text">
                Email address
              </label>
              <input
                value={this.state.email}
                onChange={(e) => this.onEmailChanged(e)}
                type="email"
                className="form-control"
              />
            </div>

            <div className="mt-4">
              <label className="form-label text">
                Password
              </label>
              <input
                value={this.state.password}
                onChange={(e) => this.onPasswordChanged(e)}
                type="password"
                className="form-control" />
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary px-5 mb-4" type="submit">
                Login
              </button>
            </div>
          </form>
          </div>
        <div className="w-50 d-flex bg-secondary mt-5 pt-3 text-center justify-content-center align-items-center m-auto">
          <p className="text">New user? {' '}
          <Link to="/register" className="text">Create an account</Link>
          </p>
         
        </div>
      </div>
      </body>
    )
  }
}
