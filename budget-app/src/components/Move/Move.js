import React, {Component} from 'react';
import Nav from '../Nav/Nav'
import {connect} from 'react-redux';
import {move} from '../../ducks/reducer';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

class Move extends Component{
    constructor(){
        super()

        this.state ={
            from: 0,
            to: 0,
            amount: null,
        }
    }
    handleFrom(e){
        this.setState({
            from: e
        })
    }
    handleTo(e){
        this.setState({
            to: e
        })
    }   
    handleAmount(e){
        this.setState({
            amount: e
        })
    }
    setTwoDeciamls(e){
        this.value = parseFloat(this.value).toFixed(2)
    }
    submit(){
        if(this.state.amount){
            axios.put('/api/move', {fromId:this.state.from,
                                    toId: this.state.to,
                                    amount: this.state.amount}).then( res => {
                this.props.move(res.data)
                this.props.history.push('/dashboard')     
            })
        }
        else{
            alert("Please enter an amount to move between envelopes")
        }
    }
    render(){
        var userEnvelopes = null;
        if(this.props.envelopes){
            userEnvelopes = this.props.envelopes.map((enve, i) => {
                return <option key={i} value={+enve.id}>{enve.name}</option>
            })
        }

        var fromName = this.props.envelopes.filter( item => item.id === +this.state.from)
        var toName = this.props.envelopes.filter( item => item.id === +this.state.to)
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>Move betweem env</h1>
                    <label>
                        From
                        <select name="envelopes" value={this.state.from} onChange={(e) => this.handleFrom(e.target.value)}>
                            <option value="">Select From Envelope</option>
                            {userEnvelopes}
                        </select>
                    </label>
                    <br/>
                    <label>
                        To:
                        <select name="envelopes" value={this.state.to} onChange={(e) => this.handleTo(e.target.value)}>
                            <option value="">Select To Envelope</option>
                            {userEnvelopes}
                        </select>
                    </label>
                    {
                        this.state.from && this.state.to 
                        ?
                        <div>
                            <h3>How much would you like to move from "{fromName[0].name}"" into "{toName[0].name}"?</h3>
                                <input type="number" 
                                value={this.state.amount} 
                                placeholder={"00.00"} 
                                onChange={(e) => this.handleAmount(e.target.value)}
                                className="money_input"
                                min='0'
                                step=".01"/>
                            <button onClick={() => this.submit()}>Submit</button>
                        </div>
                        :
                        <h3>Select which envelopes you would like to move money between?</h3>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        envelopes: state.envelopes
    }
}

export default connect(mapStateToProps, {move})(Move);
