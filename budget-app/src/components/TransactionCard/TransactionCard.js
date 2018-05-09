import React from 'react';
import './TransactionCard.css';
import {connect} from 'react-redux';
import {deleteTrans, editTrans} from '../../ducks/reducer';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

class TransactionCard extends React.Component{
    constructor(){
        super()

        this.state ={
            edit: false,
            payee: '',
            amountOG: 0,
            amountNew:0,
            envelopeOG:0,
            envelopeNew:0,
            statusOG: null,
            statusNew: null,
            note: ''
        }
        this.handleAmount =this.handleAmount.bind(this)
    }
    componentDidMount(){
        const {payee, amount, envelope, status, note} = this.props;
        this.setState({
            payee: payee,
            amountOG: amount,
            amountNew: amount,
            envelopeOG: envelope,
            envelopeNew: envelope,
            statusOG: status,
            statusNew: status,
            note: note
        })
    }
    handleEdit(){
        this.setState({
            edit: true
        })
    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    handlePayee(e){
        this.setState({
            payee: e
        })
    }
    handleAmount(e, mask, float){
        this.setState({
            amountNew: float
        })
    }
    handleEnvelopeNew(e){
        this.setState({
            envelopeNew: e
        })
    }
    handleStatusTrue(){
        this.setState({
            statusNew: true
        })
    }
    handleStatusFalse(){
        this.setState({
            statusNew: false
        })
    }
    handleNote(e){
        this.setState({
            note: e
        })
    }
    saveChanges(){
        const {payee, amountOG, amountNew, envelopeOG, envelopeNew, statusOG, statusNew, note} = this.state
        axios.put('/api/edit', {
            trans_id: this.props.id,
            payee: payee,
            amountOG: +amountOG,
            amountNew: +amountNew,
            envelopeOG: +envelopeOG,
            envelopeNew: +envelopeNew,
            statusOG: statusOG,
            statusNew: statusNew,
            note: note
        }).then(res => {
            this.props.editTrans(res.data)
            window.location.reload()
        })
    }
    render(){
        
        const {id, payee, amount, envelope, name, status, note} = this.props;

        var pending = '';
        if(status){
            pending = 'Cleared'
        }
        else{
            pending = "Pending"
        }

        var userEnvelopes = null;
        if(this.props.envelopes){
            userEnvelopes = this.props.envelopes.map((enve, i) => {
                return <option key={i} value={+enve.id}>{enve.name}</option>
            })
        }

        return (
            <div className="tran_card">
                {
                    !this.state.edit
                ?
                    <div id={this.props.styles}>
                        payee: {payee}
                        <p>amount:${(+amount).toFixed(2)}</p>
                        <p>
                        envelope:{name}
                        </p>
                        <p>
                        {pending}
                        </p>
                        <p>
                        note:{note}
                        </p>
                        <button onClick={() => this.props.deleteTrans(id, amount, envelope, status)}>Delete</button>
                        <button onClick={() => this.handleEdit()}>Edit</button>
                    </div>
                :
                <div id={this.props.styles}>
                        payee: <input type="text" value={this.state.payee} onChange={(e) => this.handlePayee(e.target.value)}/>
                        <p>amount:<CurrencyInput 
                                    value={this.state.amountNew} 
                                    onChangeEvent={this.handleAmount}
                                    prefix="$"
                                    /></p>
                        <p>
                        envelope:
                        <select name="envelopes" value={this.state.envelopeNew} onChange={(e) => this.handleEnvelopeNew(e.target.value)}>
                            <option value={this.state.envelopeOG}>{name}</option>
                            {userEnvelopes}
                        </select>
                        </p>
                        <p>
                            <label>
                                <input type="radio" name='status' onClick={() => this.handleStatusTrue()}/>
                                Cleared
                            </label>
                            <label>
                                <input type="radio" name='status' onClick={() => this.handleStatusFalse()}/>
                                Pending
                            </label>
                        </p>
                        <p>
                            note: <textarea cols="20" rows="3" value={this.state.note} onChange={(e) => this.handleNote(e.target.value)}>
                            </textarea>
                        </p>
                        <button onClick={() => this.saveChanges()}>Save Changes</button>
                        <button onClick={() => this.handleCancel()}>Cancel</button>
                    </div>
                }
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

export default  connect(mapStateToProps, {deleteTrans, editTrans})(TransactionCard);