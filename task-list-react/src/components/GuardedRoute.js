import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';

export default class GuardedRoute extends Component {
  render() {

    const { component: Component, user, ...rest } = this.props;

    return (
      <Route {...rest} render={(props) => {
        if (user) {
          return <Component {...{ ...props, ...rest.props }} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
    )
  }
}
