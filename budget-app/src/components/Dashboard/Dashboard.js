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
        window.scrollTo(0, 0);
    }
    componentDidUpdate(){
        this.props.getTransactions(this.props.user.user_id);
        this.props.getEnvelopes(this.props.user.user_id)
    }
    sign(num){
        if(num < 0){
            return '-'
        }
        return null
    }
    render(){
        //////////////These seperate the envelopes into arrays by type////////
        let everyDayArr = this.props.envelopes.filter(enve => enve.type === "Everyday" || enve.type === 'Every day')
        let monthlyBillArr = this.props.envelopes.filter(enve => enve.type === "Monthly Bill")
        let savingArr = this.props.envelopes.filter(enve => enve.type === "Saving")
        let debtArr = this.props.envelopes.filter(enve => enve.type === "Debt")  
        
        ////////////////////these calculate the total amount by type/////////
        let everyDayTotal = everyDayArr.reduce((prev, next) => prev + +next.amount, 0)
        let monthlyBillTotal = monthlyBillArr.reduce((prev, next) => prev + +next.amount, 0);
        let savingTotal = savingArr.reduce((prev, next) => prev + +next.amount, 0)
        let debtTotal = debtArr.reduce((prev, next) => prev + +next.amount, 0)

        ////////////these determine if that total is positive or negative in order to diplay that correctly/////
        let everyDaySign = this.sign(everyDayTotal);
        let monthlyBillSign = this.sign(monthlyBillTotal);
        let savingSign = this.sign(savingTotal);
        let debtSign = this.sign(debtTotal);
        
        /////////these create cards fro each type/////////
        let everyDayList = everyDayArr.map((enve, i) => {
            let {id, name, type, amount} = enve; 
            return <EnvelopeCard key={i}
                                 id={id}
                                 name={name}
                                 type={type}
                                 amount={amount}/>
        })
        let monthlyBillList = monthlyBillArr.map((enve, i) => {
            let {id, name, type, amount} = enve; 
            return <EnvelopeCard key={i}
                                 id={id}
                                 name={name}
                                 type={type}
                                 amount={amount}/>
        })
        let savingList = savingArr.map((enve, i) => {
            let {id, name, type, amount} = enve; 
            return <EnvelopeCard key={i}
                                 id={id}
                                 name={name}
                                 type={type}
                                 amount={amount}/>
        })
        let debtList = debtArr.map((enve, i) => {
            let {id, name, type, amount} = enve; 
            return <EnvelopeCard key={i}
                                 id={id}
                                 name={name}
                                 type={type}
                                 amount={amount}/>
        })

        ///////HERE IS THE RETURN STATMENT FOR RENDER()////////
        return(
            <div className="dash_container">
                <Nav />
                <div className='dash_main'>
                    <div className='dash_fixed'>
                        <Balance />
                        <hr className='line'/>
                    </div>
                    <div className="lists">
                        <h2><u>Onvelope Balances:</u></h2>
                        <div className='envelope_totals'>
                            <p>Every Day Total: {everyDaySign}${Math.abs(everyDayTotal).toFixed(2)}</p>
                            <p>Monthly Bill Total: {monthlyBillSign}${Math.abs(monthlyBillTotal).toFixed(2)}</p>
                            <p>Saving Total: {savingSign}${Math.abs(savingTotal).toFixed(2)}</p>
                            <p>Debt Total: {debtSign}${Math.abs(debtTotal).toFixed(2)}</p>                    
                        </div>
                        <hr className="line"/>
                        {everyDayList}
                        <p>Every Day Total: {everyDaySign}${Math.abs(everyDayTotal).toFixed(2)}</p>
                        <hr className="line"/>                        
                        {monthlyBillList}
                        <p>Monthly Bill Total: {monthlyBillSign}${Math.abs(monthlyBillTotal).toFixed(2)}</p>    
                        <hr className="line"/>                                            
                        {savingList}
                        <p>Saving Total: {savingSign}${Math.abs(savingTotal).toFixed(2)}</p>  
                        <hr className="line"/>                                              
                        {debtList}
                        <p>Debt Total: {debtSign}${Math.abs(debtTotal).toFixed(2)}</p>    
                        <hr className="line"/>                                                           
                        <Link to='/addenvelope'>
                            <button className="new_envelope_butt">Add New Envelope</button>
                        </Link>
                    </div>
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