import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import Balance from '../Balance/Balance';
import TransactionCard from '../TransactionCard/TransactionCard';
import {getTransactions, getUser, redirectFalse} from '../../ducks/reducer'
import {connect} from 'react-redux';
import './AllTransactions.css'


class AllTransactions extends Component{
    constructor(){
        super()

        this.state ={
            filteredList:[],
            refresh: false
        }
        this.handleRefresh = this.handleRefresh.bind(this)
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.getUser()
        this.props.redirectFalse()
        this.props.getTransactions(this.props.user.user_id);        
        this.setState({
            filteredList: this.props.transactions,
        })
    }    
    componentDidUpdate(){
            this.props.getTransactions(this.props.user.user_id);
    }
    componentWillReceiveProps(next){
        if(this.state.filteredList.length !== next.transactions.length){
            this.setState({
                filteredList: next.transactions
            })
        }
    }
    handleRefresh(){
        this.setState({
            refresh:true
        })
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
            if(tran.trans_amount > 0){
                return (
                    <TransactionCard key={i}
                    id={tran.trans_id}
                    payee={tran.payee}
                    amount={tran.trans_amount}
                    envelope={tran.envelope}
                    name={tran.name}
                    note={tran.note}
                    status={tran.status}
                    styles='pos'
                    refreshFn={this.handleRefresh}/>
                )
            }
            else{
                return (
                    <TransactionCard key={i}
                    id={tran.trans_id}
                    payee={tran.payee}
                    amount={tran.trans_amount}
                    envelope={tran.envelope}
                    name={tran.name}
                    note={tran.note}
                    status={tran.status}
                    styles='neg'
                    refreshFn={this.handleRefresh}/>
                )
            }
        })
        return(
            <div className='all_trans_container'>
                <Nav />
                <div className ="all_trans_main">
                    <div className="all_trans_fixed">
                        <h1>
                            <u>
                                All Transactions
                            </u>
                        </h1>
                        <hr className='depo_line'/>
                        <Balance />
                        {/* <button className="trans_button" id='all'
                        onClick={() => this.updateFilteredList('ALL')}>All</button>    
                        <br/>                
                        <button className="trans_button depo" onClick={() => this.updateFilteredList('DEPOSITS')}>Deposits</button>                    
                        <button className="trans_button depo" onClick={() => this.updateFilteredList('CLEARED_DEPOSITS')}>Cleared</button>                    
                        <button className="trans_button depo" onClick={() => this.updateFilteredList('PENDING_DEPOSITS')}>Pending</button>    
                        <br/>                
                        <button className="trans_button trans" onClick={() => this.updateFilteredList('PAID')}>Paid</button>                    
                        <button className="trans_button trans" onClick={() => this.updateFilteredList('CLEARED_PAID')}>Cleared</button>                    
                        <button className="trans_button trans" onClick={() => this.updateFilteredList('PENDING_PAYMENTS')}>Pending</button>             */}
                    </div>
                    <div className="cards">
                        {cards}
                    </div>
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

export default connect(mapStateToProps, {getTransactions, getUser, redirectFalse})(AllTransactions);