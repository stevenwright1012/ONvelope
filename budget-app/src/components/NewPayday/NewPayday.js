import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import PaydayEnvelope from '../PaydayEnvelope/PaydayEnvelope';
import {addTrans} from '../../ducks/reducer'


class NewPayday extends Component{
    constructor(){
        super()

        this.state ={
            amount:0,
            depoEnvelopes: []
        }
    this.calulateTotal = this.calculateTotal.bind(this);
    }
    componentDidMount(){
        var arr = this.props.envelopes.map(env => {
            let {id, name, type} = env
            var envObj ={
                id: id,
                amount: this.props.user.payday[id],
                name: name,
                type: type,
            }
            return envObj
        })
        this.setState({
            amount: +this.props.user.payday.amount,
            depoEnvelopes: arr
        })
    }
    handleAmount(e){
        this.setState({
            amount: e
        })
    }
    calculateTotal(obj){
        var filtArr = this.state.depoEnvelopes.filter( env => env.id !== obj.id);
        
        var newArr = [...filtArr, obj];
        
        this.setState({
            depoEnvelopes: newArr,
        })

    }
    submitToTrans(){
        var date = new Date();
        var month = date.getMonth();
        var day = date.getDay();
        var year = date.getFullYear();
        let subtractor = this.state.depoEnvelopes.reduce((prev, next) => {
            return prev + next.amount
        },0)
        if(this.state.amount - subtractor === 0){
            for(let i=0; i< this.state.depoEnvelopes.length; i++){
                let obj = this.state.depoEnvelopes[i]
                if(obj.amount){
                    this.props.addTrans(`${month}/${day}/${year}`, (obj.amount*-1), obj.id, true, `Paycheck submited ${month}/${day}/${year}`)
                }
            }
            setTimeout(() => {this.props.history.push('/transactions')}, 3000)
        }
        else{
            alert("Every dollar must be assigned to an envelope before you can submit")
        }
    }
    render(){
        let subtractor = this.state.depoEnvelopes.reduce((prev, next) => {
            return prev + next.amount
        },0)
        let enevlopeRows = this.props.envelopes.map( (envelope, i) => {
            let {id, name, type, amount} = envelope;
            return (
                <div>
                    <PaydayEnvelope
                    key={i}
                    id={id}
                    name={name}
                    type={type}
                    amount={amount}
                    budgetedAmount={+this.props.user.payday[id]}
                    totalFn={this.calulateTotal}
                    />
                </div>
            )
        })      
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>NewPayday</h1>
                    <input type="number" value={this.state.amount} onChange={(e) => this.handleAmount(e.target.value)}/>
                    <br/>
                    Unbudgeted:{this.state.amount - subtractor}
                    {enevlopeRows}
                    <br/>
                    <button onClick={() => this.submitToTrans()}>Send To Transactions</button>
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

export default connect(mapStateToProps, {addTrans})(NewPayday);