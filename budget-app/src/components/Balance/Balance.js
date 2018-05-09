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
                pending += +transactions[i].trans_amount
            }
        }
        return(
            <div className='card'>
                <h4>Balance</h4>
                <p>Current: ${(+this.props.user.total).toFixed(2)}</p>
                <p>Pending: ${pending.toFixed(2)}</p>
                <p>Available:${(+this.props.user.total + pending).toFixed(2)} </p>
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