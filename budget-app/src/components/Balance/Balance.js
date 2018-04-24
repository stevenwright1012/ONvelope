import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import './Balance.css'

class Balance extends Component{

    render(){
        return(
            <div className='card'>
                <h4>Balance</h4>
                <p>Current: </p>
                <p>Pending: </p>
                <p>Available: </p>
            </div>
        )
    }
}

export default Balance;