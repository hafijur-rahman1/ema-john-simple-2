
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';

const PrivetRoute = ({children, ...rest}) => {
    const [loggedIanUser, setLoggedInUser] = useContext(userContext) 
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedIanUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivetRoute;