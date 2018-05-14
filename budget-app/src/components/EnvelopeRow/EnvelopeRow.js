import React from 'react';
import {connect} from 'react-redux';
import CurrencyInput from 'react-currency-input';
import './EnvelopeRow.css'

class EnvelopeRow extends React.Component{
    constructor(){
        super()

        this.state ={
            budgetedAmount: 0,
            displayAmount: 0,
            timeout: null
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
        this.setState({
            displayAmount: float
        })
        clearTimeout(this.state.timeout)
        this.setState({
            timeout: setTimeout(() => {
                this.props.totalFn(envObj) 
                this.setState({
                    budgetedAmount: float
                })
            }, 1200)
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
                        <u>
                        Type
                        </u>
                        : {type}, 
                    </p>
                    <p>
                        <u>
                        Amount
                        </u>
                        : {sign}${Math.abs(+amount).toFixed(2)}
                    </p>
                    <CurrencyInput className="envelope_row_input"
                                value={this.state.displayAmount} 
                                placeholder="$0.00"
                                onChangeEvent={this.handleAmount}
                                prefix="$"
                                />
                    <br/>
                    <p>
                        <u>
                        After Deposit
                        </u>
                        : {sign}${Math.abs(+amount + this.state.budgetedAmount).toFixed(2)}
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