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
        let sign = null
        if(+amount < 0){
            sign = '-'
        }
        return(
            <div className="envelope_card">
                <h4>
                    {name}
                </h4>
                <p>
                    Type: {type}  
                </p>
                <p>
                    Amount: {sign}${(Math.abs(+amount)).toFixed(2)}
                </p>
                {
                +amount
                ?
                null
                :
                <button className="envelope_delete_button"
                onClick={() => this.deleteEnvelope()}>Delete Envelope</button>
                }
            </div>
        )
    }
}

export default connect(null, {getEnvelopes})(EnvelopeCard)