import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {store} from '../store/index';
import NavbarComponent from '../components/NavbarComponent/index';

export default function ProtectedRoute({children, ...rest}){

    const {token, name} = store.getState().auth;
    
    if(token){
        return (
            <>
                <NavbarComponent name={name}></NavbarComponent>
                <Route {...rest} render={children}></Route>
            </>
        );
    }else
        return <Redirect to={{pathname: "/"}}/>
    
}

