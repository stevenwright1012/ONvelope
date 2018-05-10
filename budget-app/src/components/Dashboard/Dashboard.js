import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import './Dashboard.css';
import Balance from '../Balance/Balance';
import {connect} from 'react-redux';
import {getUser, getTransactions, getEnvelopes, redirectFalse} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import EnvelopeCard from '../EnvelopeCard/EnvelopeCard'
// import axios from 'axios';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getUser();
        this.props.redirectFalse();
    }
    componentDidUpdate(){
        this.props.getTransactions(this.props.user.user_id);
        this.props.getEnvelopes(this.props.user.user_id)
    }
    render(){
        let everyDayArr = this.props.envelopes.filter(enve => enve.type === "Everyday" || enve.type === 'Every day')
        let monthlyBillArr = this.props.envelopes.filter(enve => enve.type === "Monthly bill")
        let savingArr = this.props.envelopes.filter(enve => enve.type === "Saving")
        let debtArr = this.props.envelopes.filter(enve => enve.type === "Debt")        
        
        let list = this.props.envelopes.map((enve, i) => {
            let {id, name, type, amount} = enve; 
            return <EnvelopeCard key={i}
                                 id={id}
                                 name={name}
                                 type={type}
                                 amount={amount}/>
        })
        return(
            <div className="parent">
                <Nav />
                <div className='dash_main'>
                    <div >
                        <Balance />
                    </div>
                    <h2><u>Onvelope Balances:</u></h2>
                    <div className='envelope_totals'>
                        <h4>Every Day Total: ${(everyDayArr.reduce((prev, next) => prev + +next.amount, 0)).toFixed(2)}</h4>
                        <h4>Monthly Bill Total: ${(monthlyBillArr.reduce((prev, next) => prev + +next.amount, 0)).toFixed(2)}</h4>
                        <h4>Saving Total: ${(savingArr.reduce((prev, next) => prev + +next.amount, 0)).toFixed(2)}</h4>
                        <h4>Debt Total: ${(debtArr.reduce((prev, next) => prev + +next.amount, 0)).toFixed(2)}</h4>                    
                    </div>
                    {list}
                    <Link to='/addenvelope'>
                        <button>Add New Envelope</button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        envelopes: state.envelopes
    }
}

export default connect(mapStateToProps, {getUser, getTransactions, getEnvelopes, redirectFalse})(Dashboard);