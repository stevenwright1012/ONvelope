import React, {Component} from 'react';
import Nav from '../Nav/Nav'
import './Dashboard.css'
import Balance from '../Balance/Balance'

class Dashboard extends Component{

    render(){
        return(
            <div className='main'>
                <Nav />
                <Balance />
                <div>
                    <h1>Dashboard</h1>
                </div>
            </div>
        )
    }
}

export default Dashboard;