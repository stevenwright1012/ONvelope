import React from 'react';
import {connect} from 'react-redux';
import CurrencyInput from 'react-currency-input';
import './EnvelopeRow.css'

class EnvelopeRow extends React.Component{
    constructor(){
        super()

        this.state ={
            budgetedAmount: 0
        }
        this.handleAmount = this.handleAmount.bind(this)
    }
    handleAmount(e, mask, float){
        let {id, name, type, amount} = this.props
        var envObj ={
            id: id,
            depAmount: float,
            name: name,
            type: type,
            oldAmount: amount,
        }
        this.props.totalFn(envObj) 
        this.setState({
            budgetedAmount: float
        })
    }
    render(){
        let {name, type, amount} = this.props
        let sign = null;

        if(+amount < 0){
            sign = '-'
        }
        return (
            <div className="envelope_row">
                    <span className="envelope_name">
                            {name}
                    </span>
                    <br/>
                    <p>
                        Type: {type}, 
                    </p>
                    <p>
                        Amount: {sign}${Math.abs(+amount).toFixed(2)}
                    </p>
                    <CurrencyInput className="envelope_row_input"
                                value={this.state.budgetedAmount} 
                                placeholder="$0.00"
                                onChangeEvent={this.handleAmount}
                                prefix="$"
                                />
                    <br/>
                    <p>
                        After Deposit: {sign}${Math.abs(+amount + this.state.budgetedAmount).toFixed(2)}
                    </p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        envelopes: state.envelopes
    }
}

export default connect(mapStateToProps)(EnvelopeRow);