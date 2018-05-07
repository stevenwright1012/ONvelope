import React from 'react';
import './EnvelopeCard.css';

export default function EnvelopeCard(props){
    let {name, type, amount} = props
    return(
        <div className="envelope">
            Name:{name}
            <br/>
            Type:{type},  
            Amount:{+amount}
        </div>
    )
}