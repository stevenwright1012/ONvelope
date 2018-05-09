import React from 'react';
import {connect} from 'react-redux';
import CurrencyInput from 'react-currency-input';

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
        return (
            <div className="envelope">
                <h3>EnvelopeRow</h3>
                <div>
                    Name:{name}
                    <br/>
                    Type:{type},  
                    current amount:${(+amount).toFixed(2)}
                    <br/>
                    New amount:${(+amount + this.state.budgetedAmount).toFixed(2)}
                    <br/>
                    <CurrencyInput 
                                value={this.state.budgetedAmount} 
                                placeholder="$0.00"
                                onChangeEvent={this.handleAmount}
                                prefix="$"
                                />
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

export default connect(mapStateToProps)(EnvelopeRow);