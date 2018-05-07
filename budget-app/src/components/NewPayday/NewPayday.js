import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import PaydayEnvelope from '../PaydayEnvelope/PaydayEnvelope'


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
        this.setState({
            amount: +this.props.user.payday.amount
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

export default connect(mapStateToProps)(NewPayday);