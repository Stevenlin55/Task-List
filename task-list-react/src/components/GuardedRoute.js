import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';

export default class GuardedRoute extends Component {
  render() {

    const { component: Component, user, ...otherProps } = this.props;

    return (
      <Route {...otherProps} render={(routeProps) => {
        if (user) {
          return <Component {...{ ...routeProps, ...otherProps, user }} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
    )
  }
}
