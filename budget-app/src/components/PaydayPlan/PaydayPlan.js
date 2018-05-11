import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
// import EnvelopeCard from '../EnvelopeCard/EnvelopeCard';
import PaydayForm from '../PaydayForm/PaydayForm';
import {changePlan} from '../../ducks/reducer';
import CurrencyInput from 'react-currency-input';
import './PaydayPlan.css'

class PaydayPlan extends Component{
    constructor(){
        super()

        this.state = {
            typicalPay: 0,
            envelopePlans:[]
        }
        this.changePlans = this.changePlans.bind(this)
        this.handlePay = this.handlePay.bind(this);
    }
    componentDidMount(){
        let plans = this.props.envelopes.map(env => {
            return {
                id: env.id,
                plannedAmount: this.props.payday[env.id]
            }
        })
        this.setState({
            typicalPay: this.props.payday.amount,
            envelopePlans: plans
        })
    }
    componentDidUpdate(){
        if(this.props.redirect){
            setTimeout(()=>{ this.props.history.push('/payday') }, 1000)
        }
    }
    handlePay(e, mask, float){
        this.setState({
            typicalPay: float
        })
    }
    changePlans(obj){
        var filtArr = this.state.envelopePlans.filter( plan => plan.id !== obj.id);
        var newArr = [...filtArr, obj]
        this.setState({
            envelopePlans: newArr
        })
    }
    submit(sub){
        if(this.state.typical - sub){
            alert("Every penny must be budgeted before you can save your new plan")
            return null;
        }
        const {envelopePlans} = this.state
        let newPlan = {};
        for(let i = 0; i < envelopePlans.length; i ++){
            let id = envelopePlans[i].id;
            newPlan[id] = envelopePlans[i].plannedAmount;
        }
        newPlan.amount = this.state.typicalPay
        
        this.props.changePlan(newPlan)
    }
    render(){
        let editList = this.props.envelopes.map((enve, i) => {
            let {id, name, type} = enve;
            let budgetedAmount = this.props.payday[id]
            if(!type){
                return null
            }
            return (
                <div>
                    <PaydayForm
                    key = {i}
                    id = {id}
                    name = {name}
                    type = {type}
                    amount = {+budgetedAmount}
                    changeFn = {this.changePlans}/>
                </div>
            )
        })
        let subtractor = this.state.envelopePlans.reduce((prev, next) => {
            return prev + next.plannedAmount
        },0)
        return(
            <div className='plan_container'>
                <Nav />
                <div className="plan_main">
                    <div className="plan_fixed">
                        <h1>Payday  Plan</h1>
                        <hr className='line'/>
                        Typical Payday:<CurrencyInput className="payday_input"
                                        value={this.state.typicalPay} 
                                        onChangeEvent={this.handlePay}
                                        prefix="$"
                                        />
                        <br/>
                        Unbudgeted: {this.state.typicalPay - subtractor} 
                    <hr className='line'/>
                    </div>
                    <div className="plan_envelopes">
                        {editList}
                        <button className ="depo_button"
                        onClick={() => this.submit(subtractor)}>Save Payday Plan</button>             
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        envelopes: state.envelopes,
        payday: state.payday,
        redirect: state.redirect
    }
}

export default connect(mapStateToProps, {changePlan})(PaydayPlan);