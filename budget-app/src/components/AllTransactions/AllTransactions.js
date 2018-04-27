import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import Balance from '../Balance/Balance';
import TransactionCard from '../TransactionCard/TransactionCard';
import {getTransactions, getUser} from '../../ducks/reducer'
import {connect} from 'react-redux';


class AllTransactions extends Component{
    constructor(){
        super()

        this.state ={
            filteredList:[]
        }
    
    }
    componentDidMount(){
        this.props.getTransactions(this.props.user.user_id);
        // this.getUser()
        this.setState({
            filteredList: this.props.transactions,
        })
    }
    componentWillReceiveProps(next){
        if(this.state.filteredList.length !== next.transactions.length){
            this.setState({
                filteredList: next.transactions
            })
        }
    }

    updateFilteredList(str){
        let newList=[];
        switch (str) {
            case "DEPOSITS":
                newList = this.props.transactions.filter(tran =>{
                    if(tran.amount > 0){
                        return tran
                    }else{
                        return null
                    }
                })
                this.setState({
                    filteredList: newList
                })
                break;
            case "PAID":
                newList = this.props.transactions.filter(tran =>{
                    if(tran.amount < 0){
                        return tran
                    }else{
                        return null
                    }
                })
                this.setState({
                    filteredList: newList
                })
                break;
            case "PENDING_DEPOSITS":
                newList = this.props.transactions.filter(tran =>{
                    if(tran.amount > 0 && tran.status === false){
                        return tran
                    }else{
                        return null
                    }
                })
                this.setState({
                    filteredList: newList
                })
                break;
            case "PENDING_PAYMENTS":
                newList = this.props.transactions.filter(tran =>{
                    if(tran.amount < 0 && tran.status === false){
                        return tran
                    }else{
                        return null
                    }
                })
                this.setState({
                    filteredList: newList
                })
                break;
            case "CLEARED_DEPOSITS":
                newList = this.props.transactions.filter(tran =>{
                    if(tran.amount > 0 && tran.status === true){
                        return tran
                    }else{
                        return null
                    }
                })
                this.setState({
                    filteredList: newList
                })
                break;
            case "CLEARED_PAID":
                newList = this.props.transactions.filter(tran =>{
                    if(tran.amount < 0 && tran.status === true){
                        return tran
                    }else{
                        return null
                    }
                })
                this.setState({
                    filteredList: newList
                })
                break;
            case "ALL":
                this.setState({
                    filteredList: this.props.transactions
                })
                break;
            default:
                this.setState({
                    filteredList: this.props.transactions
                })
                break;
        }
    }
    render(){
        var cards = this.state.filteredList.map((tran, i) => {
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
                    <h1>All Transactions</h1>
                    <Balance />
                    <button onClick={() => this.updateFilteredList('ALL')}>All</button>                    
                    <button onClick={() => this.updateFilteredList('DEPOSITS')}>Deposits</button>                    
                    <button onClick={() => this.updateFilteredList('CLEARED_DEPOSITS')}>Cleared</button>                    
                    <button onClick={() => this.updateFilteredList('PENDING_DEPOSITS')}>Pending</button>                    
                    <button onClick={() => this.updateFilteredList('PAID')}>Paid</button>                    
                    <button onClick={() => this.updateFilteredList('CLEARED_PAID')}>Cleared</button>                    
                    <button onClick={() => this.updateFilteredList('PENDING_PAYMENTS')}>Pending</button>                    
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

export default connect(mapStateToProps, {getTransactions, getUser})(AllTransactions);