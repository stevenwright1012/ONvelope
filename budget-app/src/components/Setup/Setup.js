import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo'


class Setup extends React.Component{
    render(){
        return(
        <Switch>
            <Route path='/stepone' component={StepOne}/>
            <Route path='/steptwo' component={StepTwo}/>
            {/* <Route path='' component={}/>
            <Route path='' component={}/>                                                
            <Route path='' component={}/> */}
        </Switch>
        )
    }
}

export default Setup