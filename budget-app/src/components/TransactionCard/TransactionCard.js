import React from 'react';
import './TransactionCard.css';
import {connect} from 'react-redux';
import {deleteTrans} from '../../ducks/reducer'

class TransactionCard extends React.Component{

    render(){
        const {id, payee, amount, envelope, status, note} = this.props;
        let newTotal = this.props.user.total
        if(status){
            newTotal -= amount
        }
        
        var pending = '';
        if(status){
            pending = 'Cleared'
        }
        else{
            pending = "Pending"
        }

        var envelopeName = this.props.envelopes.filter( item => item.id=== +envelope)
        console.log(envelope);
        console.log(envelopeName);
        
        
        return (
            <div className="tran_card">
                {
                    amount > 0
                ?
                    <div id="pos">
                    payee: {payee}
                    <p>amount:{amount}</p>
                    <p>
                    envelope:{envelopeName[0].name}
                    </p>
                    <p>
                    {pending}
                    </p>
                    <p>
                    note:{note}
                    </p>
                    <button onClick={() => this.props.deleteTrans(id, newTotal, amount, envelope)}>Delete</button>
                    <button>Edit</button>
                    </div>
                :
                    <div id="neg">
                    payee: {payee}
                    <p>amount:{amount}</p>
                    <p>
                    envelope:{envelopeName[0].name}
                    </p>
                    <p>
                    {pending}
                    </p>
                    <p>
                    note:{note}
                    </p>
                    <button onClick={() => this.props.deleteTrans(id, newTotal, amount, envelope)}>Delete</button>
                    <button>Edit</button>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        envelopes: state.envelopes
    }
}

export default  connect(mapStateToProps, {deleteTrans})(TransactionCard);