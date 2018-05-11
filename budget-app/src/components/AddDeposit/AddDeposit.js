import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import EnvelopeRow from '../EnvelopeRow/EnvelopeRow'
import {addTrans, redirectFalse, getUser, getTransactions, getEnvelopes} from '../../ducks/reducer';
import CurrencyInput from 'react-currency-input';
import './AddDeposit.css'

class AddDeposit extends Component{
    constructor(){
        super()

        this.state ={
            amount: 0,
            payer: "",
            status: false,
            note: '',
            depoEnvelopes: []
        }
    this.calulateTotal = this.calulateTotal.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    }
    componentDidMount(){
        this.props.getUser();
        window.scrollTo(0, 0);
    }
    componentDidUpdate(){
        if(this.props.redirect){
            setTimeout(()=>{ this.props.history.push('/transactions') }, 1000)
        }
        this.props.getTransactions(this.props.user.user_id);
        this.props.getEnvelopes(this.props.user.user_id);
    }
    handleAmount(e, mask, float){
        this.setState({
            amount: float,
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
    handleNote(e){
        this.setState({
            note: e
        })
    }
    calulateTotal(obj){
        var filtArr = this.state.depoEnvelopes.filter( env => env.id !== obj.id);
        var newArr = [...filtArr, obj];
        this.setState({
            depoEnvelopes: newArr,
        })
    }
    submitToTrans(sub){
        if(!this.state.amount || !this.state.payer){
            alert("Please complete form")
            return null;
        }
        if((this.state.amount - sub) !== 0){
            alert("Every Penny must be budgeted before you can add this deposit to your transactions")
            return null
        }
        this.refs.btn.setAttribute("disabled", "disabled");        
        for(let i=0; i< this.state.depoEnvelopes.length; i++){
            let obj = this.state.depoEnvelopes[i]
            if(obj.depAmount){
                this.props.addTrans(this.state.payer, (obj.depAmount*-1), obj.id, this.state.status, this.state.note)
            }
        }
    }
    render(){
        let subtractor = this.state.depoEnvelopes.reduce((prev, next) => {
            return prev + next.depAmount
        },0)
        let enevlopeRows = this.props.envelopes.map( (envelope, i) => {
            let {id, name, type, amount} = envelope; 
            if(!type){
                return null;
            }
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
            <div className='add_deposit_container'>
                <Nav />
                <div className="add_deposit_main">
                    <div className="add_deposit_fixed">
                        <h1>
                            <u>
                                Add Deposit
                            </u>
                        </h1>
                        <hr className='depo_line'/>
                        <CurrencyInput className="depo_input"
                        value={this.state.amount} 
                        placeholder="How much?"
                        onChangeEvent={this.handleAmount}
                        prefix="$"/>
                        <input className="depo_input"
                        type="text" placeholder='From Where?' 
                        onChange={(e) => this.handlePayer(e.target.value)}/>
                        <br/>
                        <label className="depo_radio" id="cleared">
                            <input
                            type="radio" 
                            name='status' 
                            onClick={() => this.handleStatusTrue()}/>
                            Cleared
                        </label>
                        <label className="depo_radio">
                            <input
                            type="radio" 
                            name='status' 
                            onClick={() => this.handleStatusFalse()}/>
                            Pending
                        </label>
                        <br/>
                        <p>
                            Unbudgeted: ${(this.state.amount - subtractor).toFixed(2)}
                        </p>
                        <hr className='depo_line'/>
                    </div>
                    <div className="envelope_rows">
                        {enevlopeRows}
                        
                        <hr className='depo_line'/>                        
                        <textarea className="depo_note"
                        cols="20" rows="3" placeholder='Write a short note here if you want' onChange={(e) => this.handleNote(e.target.value)}>
                        </textarea>
                        <button className="depo_button"
                        ref="btn"
                        onClick={() => this.submitToTrans(subtractor)}>
                        Send to Transactions</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        envelopes: state.envelopes,
        redirect: state.redirect
    }
}

export default connect(mapStateToProps, {addTrans, redirectFalse, getUser, getTransactions, getEnvelopes})(AddDeposit);