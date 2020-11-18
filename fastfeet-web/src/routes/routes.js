import React from 'react';
import {Switch, Route} from 'react-router-dom';


import LoginPage from '../pages/LoginPage';

import OrderManagerPage from '../pages/OrderManagerPage';
import OrderPage from '../pages/OrderPage';

import DeliveryPeopleManagerPage from '../pages/DeliveryPeopleManagerPage';
import DeliveryPeoplePage from '../pages/DeliveryPeoplePage';

import RecipientManagerPage from '../pages/RecipientManagerPage';
import RecipientPage from '../pages/RecipientPage';

import OrderProblemPage from '../pages/OrderProblemPage';

import ProtectedRoute from './ProtectedRoute';
export default function Routes(){

    return (
        <Switch>
            
            <Route exact path="/" component={LoginPage}/>

            <ProtectedRoute path="/order-manager" component={OrderManagerPage}/>
            <ProtectedRoute path="/order/:id" component={OrderPage}/>
            <ProtectedRoute path="/order" component={OrderPage}/>
            <ProtectedRoute path="/order-problem" component={OrderProblemPage}/>

            <ProtectedRoute path="/delivery-people-manager" component={DeliveryPeopleManagerPage}/>
            <ProtectedRoute path="/delivery-people/:id" component={DeliveryPeoplePage}/>
            <ProtectedRoute path="/delivery-people" component={DeliveryPeoplePage}/>

            <ProtectedRoute path="/recipient-manager" component={RecipientManagerPage}/>
            <ProtectedRoute path="/recipient/:id" component={RecipientPage}/>
            <ProtectedRoute path="/recipient" component={RecipientPage}/>
    
        </Switch>
    );


}