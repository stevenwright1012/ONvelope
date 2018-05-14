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
        this.handleAmount = this.handleAmount.bind(this)
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
                Amount: <CurrencyInput className="payday_input"
                        value={this.state.plannedAmount} 
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