import React from 'react';
import '../EnvelopeCard/EnvelopeCard.css';
import {connect} from 'react-redux';
import CurrencyInput from 'react-currency-input'

class PaydayForm extends React.Component{
    constructor(){
        super()

        this.state ={
            plannedAmount: 0
        }
        this.handleAmount = this.handleAmount.binf(this)
    }
    componentDidMount(){
        this.setState({
            plannedAmount: +this.props.user.payday[this.props.id]
        })
    }
    handleAmount(e, mask, float){
        this.props.changeFn({
            id: this.props.id,
            plannedAmount: float
        })
        this.setState({
            plannedAmount: float
        })
    }
    render(){
        let {name, type} = this.props
        return(
            <div className="envelope">
                Name:{name}
                <br/>
                Type:{type},  
                Amount:<CurrencyInput 
                        value={this.state.amount} 
                        onChangeEvent={this.handleAmount}
                        prefix="$"
                        />
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(PaydayForm);