import React from 'react';
import './TransactionCard.css';
import {connect} from 'react-redux';
import {deleteTrans} from '../../ducks/reducer'

class TransactionCard extends React.Component{

    render(){
        const {id, payee, amount, envelope, status, note} = this.props;
        var pending = '';
        if(status){
            pending = 'Cleared'
        }
        else{
            pending = "Pending"
        }
        return (
            <div className="tran_card">
                {
                    amount > 0
                ?
                    <div id="pos">
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
                    <button onClick={() => this.props.deleteTrans(id)}>Delete</button>
                    <button>Edit</button>
                    </div>
                :
                    <div id="neg">
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
                    <button onClick={() => this.props.deleteTrans(id)}>Delete</button>
                    <button>Edit</button>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default  connect(mapStateToProps, {deleteTrans})(TransactionCard);