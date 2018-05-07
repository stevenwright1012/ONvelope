import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import EnvelopeCard from '../EnvelopeCard/EnvelopeCard'

class PaydayPlan extends Component{

    render(){
        let list = this.props.envelopes.map((enve, i) => {
            let {id, name, type} = enve;
            let budgetedAmount = this.props.user.payday[id]
            return (
                <div>
                    <EnvelopeCard 
                    key = {i}
                    id = {id}
                    name = {name}
                    type = {type}
                    amount = {+budgetedAmount}/>
                </div>
            )
        })
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>PaydayPlan</h1>
                    Typical Payday:${this.props.user.payday.amount}
                    {list}
                    <button>Update Plan</button>
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

export default connect(mapStateToProps)(PaydayPlan);