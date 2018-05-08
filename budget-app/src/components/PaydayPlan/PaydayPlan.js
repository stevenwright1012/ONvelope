import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import EnvelopeCard from '../EnvelopeCard/EnvelopeCard';
import PaydayForm from '../PaydayForm/PaydayForm';
import {changePlan} from '../../ducks/reducer'

class PaydayPlan extends Component{
    constructor(){
        super()

        this.state = {
            edit: false,
            typicalPay: 0,
            envelopePlans:[]
        }
        this.changePlans = this.changePlans.bind(this)
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
    handleEdit(){
        this.setState({
            edit: true
        })
    }
    handlePay(e){
        this.setState({
            typicalPay: e
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
        this.props.history.push('/payday')
    }
    render(){
        console.log(this.state.envelopePlans);
        
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
        let list = this.props.envelopes.map((enve, i) => {
            let {id, name, type} = enve;
            let budgetedAmount = this.props.payday[id]
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
        let subtractor = this.state.envelopePlans.reduce((prev, next) => {
            return prev + next.plannedAmount
        },0)
        return(
            <div className='main'>
                <Nav />
                {this.state.edit
                ?
                <div>
                    <h1>Payday  Plan</h1>
                    Typical Payday:<i>$</i>
                    <input type="number"
                        value={this.state.typicalPay}
                        onChange={(e) => this.handlePay(e.target.value)}/>
                    <br/>
                    Unbudgeted: {this.state.typicalPay - subtractor} 
                    {editList}
                    <button onClick={() => this.submit()}>Save new Payday Plan</button>             
                </div>
                :
                <div>
                    <h1>Payday  Plan</h1>
                    Typical Payday:${this.props.payday.amount}
                    {list}
                    <button onClick={() => this.handleEdit()}>Update Plan</button>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        envelopes: state.envelopes,
        payday: state.payday
    }
}

export default connect(mapStateToProps, {changePlan})(PaydayPlan);