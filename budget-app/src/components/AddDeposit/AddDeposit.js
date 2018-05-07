import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import EnvelopeRow from '../EnvelopeRow/EnvelopeRow'
import {addTrans} from '../../ducks/reducer'

class AddDeposit extends Component{
    constructor(){
        super()

        this.state ={
            amount: 0,
            payer: "",
            status: false,
            depoEnvelopes: []
        }
    this.calulateTotal = this.calulateTotal.bind(this)
    }
    handleAmount(e){
        this.setState({
            amount: e,
        })
    }
    handlePayer(e){
        this.setState({
            payer: e
        })
    }
    handleStatusTrue(){
        this.setState({
            status: true
        })
    }
    handleStatusFalse(){
        this.setState({
            status:false
        })
    }
    calulateTotal(obj){
        var filtArr = this.state.depoEnvelopes.filter( env => env.id !== obj.id);
        var newArr = [...filtArr, obj];
        this.setState({
            depoEnvelopes: newArr,
        })
    }
    submitToTrans(){
        for(let i=0; i< this.state.depoEnvelopes.length; i++){
            let obj = this.state.depoEnvelopes[i]
            if(obj.depAmount){
                this.props.addTrans(this.state.payer, (obj.depAmount*-1), obj.id, this.state.status, null)
            }
        }
        this.props.history.push('/transactions')
    }
    render(){
        let subtractor = this.state.depoEnvelopes.reduce((prev, next) => {
            return prev + next.depAmount
        },0)
        let enevlopeRows = this.props.envelopes.map( (envelope, i) => {
            let {id, name, type, amount} = envelope; 
            return (
                <div>
                    <EnvelopeRow 
                    key={i}
                    id={id}
                    name={name}
                    type={type}
                    amount={amount}
                    totalFn={this.calulateTotal}
                    />
                </div>
            )
        })
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>AddDeposit</h1>
                    <input type="number" placeholder='How Much?' onChange={(e) => this.handleAmount(+e.target.value)}/>
                    <input type="text" placeholder='From Who?' onChange={(e) => this.handlePayer(e.target.value)}/>
                    <br/>
                    <label>
                        <input type="radio" name='status' onClick={() => this.handleStatusTrue()}/>
                        Cleared
                    </label>
                    <label>
                        <input type="radio" name='status' onClick={() => this.handleStatusFalse()}/>
                        Pending
                    </label>
                    <br/>
                    Unbudgeted:{this.state.amount - subtractor}
                    {enevlopeRows}
                    <br/>
                    <button onClick={() => this.submitToTrans()}>Send to transactions</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        envelopes: state.envelopes
    }
}

export default connect(mapStateToProps, {addTrans})(AddDeposit);