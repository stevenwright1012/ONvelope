import React, {Component} from 'react';
import Nav from '../Nav/Nav'
import {connect} from 'react-redux';
import {addTrans} from '../../ducks/reducer';
import CurrencyInput from 'react-currency-input';
import './AddTransaction.css'

class AddTransaction extends Component{
    constructor(){
        super()

        this.state= {
            payee: '',
            amount:0,
            envelope: 0,
            status: false,
            note: '',

        }
        this.handleAmount = this.handleAmount.bind(this)
    }
    componentDidUpdate(){
        if(this.props.redirect){
            setTimeout(()=>{ this.props.history.push('/transactions') }, 1000)
        }
    }
    handlePayee(e){
        this.setState({
            payee: e
        })
    }
    handleAmount(e, mask, float){
        this.setState({
            amount: float
        })
    }
    handleEnvelope(e){
        this.setState({
            envelope: e
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
    submitTransaction(){
        const { payee, amount, envelope, status, note} = this.state;
        if(!envelope || !amount || !payee){
            return alert("Please complete form")
        }
        this.refs.btn.setAttribute("disabled", "disabled");  
        
        this.props.addTrans(payee, amount, envelope, status, note)
        // this.props.history.push('/transactions')
    }
    render(){
        var userEnvelopes = null;
        if(this.props.envelopes){
            userEnvelopes = this.props.envelopes.map((enve, i) => {
                return <option key={i} value={enve.id}>{enve.name}</option>
            })
        }
        return(
            <div className='add_trans_container'>
                <Nav />
                <div className="add_trans_main">
                    <h1>
                        <u>
                            Add Transaction
                        </u>
                    </h1>
                    <hr className='depo_line'/>
                    <input className="add_trans_input"
                    type="text" 
                    placeholder='Payee' 
                    onChange={(e) => this.handlePayee(e.target.value)}/>
                    <br/>
                    <CurrencyInput className="add_trans_input"
                        value={this.state.amount} 
                        placeholder="Amount"
                        onChangeEvent={this.handleAmount}
                        prefix="$"
                        />
                    <br/>
                    <select className="add_trans_dropdown"
                    name="envelopes" 
                    value={this.state.envelope} 
                    onChange={(e) => this.handleEnvelope(e.target.value)}>
                        <option value="">Select Envelope</option>
                        {userEnvelopes}
                    </select>
                    <br/>
                    <label className="trans_radio">
                        <input className="trans_radio"
                        type="radio" 
                        name='status' 
                        onClick={() => this.handleStatusTrue()}/>
                        Cleared
                    </label>
                    <label className="trans_radio">
                        <input className="trans_radio"
                        type="radio" 
                        name='status' 
                        onClick={() => this.handleStatusFalse()}/>
                        Pending
                    </label>
                    <br/>
                    <textarea className="trans_note"
                    cols="20" rows="3" 
                    placeholder='Write a short note here if you want' 
                    onChange={(e) => this.handleNote(e.target.value)}>
                    </textarea>
                    <br/>
                    <button className="trans_submit" ref="btn"
                    onClick={() => this.submitTransaction()}>
                    Submit</button>         
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        envelopes: state.envelopes,
        redirect: state.redirect
    }
}

export default connect(mapStateToProps, {addTrans})(AddTransaction);