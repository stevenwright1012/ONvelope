import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import './Dashboard.css';
import Balance from '../Balance/Balance';
import {connect} from 'react-redux';
import {getUser, getTransactions} from '../../ducks/reducer';
// import axios from 'axios';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    componentDidUpdate(){
        this.props.getTransactions(this.props.user.user_id)
    }
    render(){
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>Dashboard</h1>
                    <Balance />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps, {getUser, getTransactions})(Dashboard);