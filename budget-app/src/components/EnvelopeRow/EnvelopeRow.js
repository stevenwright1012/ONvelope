import React from 'react';
import {connect} from 'react-redux';

class EnvelopeRow extends React.Component{
    constructor(){
        super()

        this.state ={
            budgetedAmount: 0
        }
    }
    handleAmount(e){
        let {id, name, type, amount} = this.props
        var envObj ={
            id: id,
            depAmount: e,
            name: name,
            type: type,
            oldAmount: amount,
        }
        this.props.totalFn(envObj) 
        this.setState({
            budgetedAmount: e
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
                    current amount:{+amount}
                    <br/>
                    New amount:{+amount + this.state.budgetedAmount}
                    <br/>
                    <input type="number" onChange={(e) => this.handleAmount(+e.target.value)}/>
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