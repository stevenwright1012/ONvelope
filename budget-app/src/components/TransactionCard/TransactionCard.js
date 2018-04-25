import React from 'react';
import './TransactionCard.css'

export default  function TransactionCard(props){
    const {id, payee, amount, envelope, status, note} = props;
    var pending = '';
    if(status){
        pending = 'Cleared'
    }
    else{
        pending = "Pending"
    }
    return (
        <div className="tran_card">
            payee: {payee}
            <p>amount:{amount}</p>
            <p>
            envelope:{envelope}
            </p>
            <p>
            {pending}
            </p>
            <p>
            note:{note}
            </p>
        </div>
    )
}