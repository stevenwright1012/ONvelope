import React from 'react';
import {Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from './components/Login'
import Test from './components/Test';


export default(
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/test' component={Test}/>
    </Switch>
)