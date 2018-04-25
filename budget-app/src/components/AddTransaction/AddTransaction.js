import React, {Component} from 'react';
import Nav from '../Nav/Nav'
import {connect} from 'react-redux';
import axios from 'axios';

class AddTransaction extends Component{
    constructor(){
        super()

        this.state= {
            payee: '',
            amount:0,
            envelope: '',
            status: false,
            note: '',

        }
    }
    handlePayee(e){
        this.setState({
            payee: e
        })
    }
    handleAmount(e){
        this.setState({
            amount: e
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
        const { payee, amount, envelope, status, note} = this.state

        axios.post('/api/addtrans', {
            user_id: this.props.user.user_id,
            payee: payee,
            amount: (amount * -1),
            envelope: envelope,
            status: status,
            note: note
        }).then(res => {
            this.props.history.push('/transactions')
        })
    }
    render(){
        var userEnvelopes = null;
        if(this.props.envelopes){
            userEnvelopes = this.props.envelopes.map(enve => {
                return <option value={enve.name}>{enve.name}</option>
            })
        }
        return(
            <div className='main'>
                <Nav />
                <div>
                <h1>AddTransaction</h1>
                    <input type="text" placeholder='Payee' onChange={(e) => this.handlePayee(e.target.value)}/>
                    <br/>
                    <input type="number" placeholder='Amount'onChange={(e) => this.handleAmount(e.target.value)}/>
                    <br/>
                    <select name="envelopes" value={this.state.envelope} onChange={(e) => this.handleEnvelope(e.target.value)}>
                        <option value="">Select Envelope</option>
                        {userEnvelopes}
                    </select>
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
                    <textarea cols="20" rows="3" placeholder='Write a short note here if you want' onChange={(e) => this.handleNote(e.target.value)}>
                    </textarea>
                    <br/>
                    <button onClick={() => this.submitTransaction()}>Submit</button>         
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

export default connect(mapStateToProps)(AddTransaction);