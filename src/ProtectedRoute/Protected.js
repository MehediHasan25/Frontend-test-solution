import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



const ProtectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      
        localStorage.getItem('token') !== null
        ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)


export default ProtectRoute;