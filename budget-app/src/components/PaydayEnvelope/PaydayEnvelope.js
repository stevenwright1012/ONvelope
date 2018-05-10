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
        return (
            <div className="envelope">
                <h3>{name}</h3>
                <div>
                    Type:{type},
                    <br/>
                    current amount:${(+amount).toFixed(2)}
                    <br/>
                    <CurrencyInput 
                    value={this.state.budgetedAmount} 
                    placeholder="$0.00"
                    onChangeEvent={this.handleAmount}
                    prefix="$"
                    />
                    <br/>
                    New amount:${(+amount + +this.state.budgetedAmount).toFixed(2)}

                </div>
            </div>
        )
    }
}


export default PaydayEnvelope;