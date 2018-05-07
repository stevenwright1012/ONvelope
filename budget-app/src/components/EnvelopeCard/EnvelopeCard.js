import React from 'react';

export default function EnvelopeCard(props){
    let {name, type, amount} = props
    return(
        <div>
            Name:{name}
            <br/>
            Type:{type},  
            Current amount:{+amount}
        </div>
    )
}