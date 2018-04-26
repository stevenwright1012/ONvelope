import React, {Component} from 'react';
import './Balance.css';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer'

class Balance extends Component{
    // componentDidMount(){
    //     this.props.getUser()
    // }
    render(){
        const{transactions} = this.props
        var pending = 0;
        for(let i = 0; i < transactions.length; i++){
            if(!transactions[i].status){
                pending += +transactions[i].amount
            }
        }
        return(
            <div className='card'>
                <h4>Balance</h4>
                <p>Current: ${this.props.user.total}</p>
                <p>Pending: ${pending}</p>
                <p>Available:${+this.props.user.total + pending} </p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, {getUser})(Balance);