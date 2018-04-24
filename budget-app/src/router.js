import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import AddDeposit from './components/AddDeposit/AddDeposit';
import AddTransaction from './components/AddTransaction/AddTransaction';
import AllTransactions from './components/AllTransactions/AllTransactions';
import NewPayday from './components/NewPayday/NewPayday';
import PaydayPlan from './components/PaydayPlan/PaydayPlan';
import AddEnvelope from './components/AddEnvelope/AddEnvelope';


export default(
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/transactions' component={AllTransactions}/>
        <Route path='/deposit' component={AddDeposit}/>
        <Route path='/trans' component={AddTransaction}/>
        <Route path='/payday' component={NewPayday}/>
        <Route path='/plan' component={PaydayPlan}/>
        <Route path='/addenvelope' component={AddEnvelope}/>
    </Switch>
)