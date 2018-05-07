import React from 'react';
import '../EnvelopeCard/EnvelopeCard.css';
import {connect} from 'react-redux';

class PaydayForm extends React.Component{
    constructor(){
        super()

        this.state ={
            plannedAmount: 0
        }
    }
    componentDidMount(){
        this.setState({
            plannedAmount: +this.props.user.payday[this.props.id]
        })
    }
    handleAmount(e){
        this.props.changeFn({
            id: this.props.id,
            plannedAmount: e
        })
        this.setState({
            plannedAmount: e
        })
    }
    render(){
        let {name, type} = this.props
        return(
            <div className="envelope">
                Name:{name}
                <br/>
                Type:{type},  
                Amount: <input type="number"
                value={this.state.plannedAmount}
                onChange={(e) => this.handleAmount(+e.target.value)}/>
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