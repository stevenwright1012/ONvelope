import React from 'react';

class PaydayEnvelope extends React.Component{
    constructor(){
        super()

        this.state ={
            budgetedAmount: 0
        }
    }
    componentDidMount(){
        let plannedAmount = +this.props.budgetedAmount
        this.setState({
            budgetedAmount: plannedAmount
        })
    }
    handleAmount(e){
        let {id, name, type} = this.props
        var obj = {id: id,
                   amount: e,
                   name: name,
                   type: type}
        this.props.totalFn(obj)
        this.setState({
            budgetedAmount: e
        })
    }
    render(){
        let {name, type, amount} = this.props
        return (
            <div className="envelope">
                <h3>PaydayEnvelope</h3>
                <div>
                    Name:{name}
                    <br/>
                    Type:{type},  
                    current amount:{+amount}
                    <br/>
                    New amount:{+amount + this.state.budgetedAmount}
                    <br/>
                    <input type="number" value={this.state.budgetedAmount} 
                    onChange={(e) => this.handleAmount(+e.target.value)}
                    />

                </div>
            </div>
        )
    }
}


export default PaydayEnvelope;