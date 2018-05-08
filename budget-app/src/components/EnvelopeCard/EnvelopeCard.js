import React from 'react';
import './EnvelopeCard.css';
import {connect} from 'react-redux';
import {getEnvelopes} from '../../ducks/reducer';
import axios from 'axios'

class EnvelopeCard extends React.Component{
    deleteEnvelope(){
        let {id, amount} = this.props
        if(+amount){
            alert("An Envelope must be empty before it can be deleted")
        }
        else{
            axios.delete(`/api/envdelete/${id}`).then(res => {
                
            })
        }
    }
    render(){
        let {name, type, amount} = this.props
        return(
            <div className="envelope">
                Name:{name}
                <br/>
                Type:{type},  
                Amount:{+amount}
                <button onClick={() => this.deleteEnvelope()}>Delete Envelope</button>
            </div>
        )
    }
}

export default connect(null, {getEnvelopes})(EnvelopeCard)