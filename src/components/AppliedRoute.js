import React from "react";
import { Route } from "react-router-dom";

//make a decorator component for routes to apply the appProps we're gonna need for session
//it returns the component wrapped inside a Route component
//props: props passed down from Route component
//appProps: props we're trying to set from App component

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route {...rest} render={props => <C {...props} {...appProps} />} />
  );
};