import React from 'react';
import CurrencyInput from 'react-currency-input';

class PaydayEnvelope extends React.Component{
    constructor(){
        super()

        this.state ={
            budgetedAmount: 0
        }
        this.handleAmount = this.handleAmount.bind(this)
    }
    componentDidMount(){
        let plannedAmount = +this.props.budgetedAmount
        this.setState({
            budgetedAmount: plannedAmount
        })
    }
    handleAmount(e, mask, float){
        let {id, name, type} = this.props
        var obj = {id: id,
                   amount: float,
                   name: name,
                   type: type}
        this.props.totalFn(obj)
        this.setState({
            budgetedAmount: float
        })
    }
    render(){
        let {name, type, amount} = this.props
        let sign=''
        if(amount < 0){
            sign ='-'
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
                                value={this.state.budgetedAmount} 
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


export default PaydayEnvelope;