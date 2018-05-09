import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
// import EnvelopeCard from '../EnvelopeCard/EnvelopeCard';
import PaydayForm from '../PaydayForm/PaydayForm';
import {changePlan} from '../../ducks/reducer';
import CurrencyInput from 'react-currency-input';

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
    submit(){
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
            <div className='main'>
                <Nav />
                <div>
                    <h1>Payday  Plan</h1>
                    Typical Payday:<CurrencyInput 
                                    value={this.state.typicalPay} 
                                    onChangeEvent={this.handlePay}
                                    prefix="$"
                                    />
                    <br/>
                    Unbudgeted: {this.state.typicalPay - subtractor} 
                    {editList}
                    <button onClick={() => this.submit()}>Save new Payday Plan</button>             
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