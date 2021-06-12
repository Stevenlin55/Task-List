import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import firebase from './firebase/firebase';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GuardedRoute from './components/GuardedRoute';
import PropsRoute from './components/PropsRoute';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  componentDidMount() {
      this.auth.onAuthStateChanged((user) => {
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;

    //header underneath
    return (
      <div>
        {
          loading ?
            <div>Loading</div>
            :
            <BrowserRouter>
             
              <PropsRoute path="/login" exact component={Login} user={user} />
              <PropsRoute path="/register" exact component={Register} user={user} />
              <GuardedRoute path="/" exact component={Home} user={user} />
            </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;
