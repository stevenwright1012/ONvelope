import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import Balance from '../Balance/Balance';
import TransactionCard from '../TransactionCard/TransactionCard';
import {getTransactions} from '../../ducks/reducer'
import {connect} from 'react-redux';


class AllTransactions extends Component{
    componentDidMount(){
        this.props.getTransactions(this.props.user.user_id)
    }
    componentDidUpdate(){
        this.props.getTransactions(this.props.user.user_id)
        
    }
    render(){
        var cards = this.props.transactions.map((tran, i) => {
            return (
                <TransactionCard key={i}
                id={tran.id}
                payee={tran.payee}
                amount={tran.amount}
                envelope={tran.envelope}
                note={tran.note}
                status={tran.status}/>
            )
        })
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>AllTransactions</h1>
                    <Balance />
                    {cards}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        transactions: state.transactions,
    }
}

export default connect(mapStateToProps, {getTransactions})(AllTransactions);