import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import './Dashboard.css';
import Balance from '../Balance/Balance';
import {connect} from 'react-redux';
import {getUser, getTransactions, getEnvelopes, redirectFalse} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import EnvelopeCard from '../EnvelopeCard/EnvelopeCard'
// import axios from 'axios';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getUser();
        this.props.redirectFalse();
    }
    componentDidUpdate(){
        this.props.getTransactions(this.props.user.user_id);
        this.props.getEnvelopes(this.props.user.user_id)
    }
    render(){
        
        let list = this.props.envelopes.map((enve, i) => {
            let {id, name, type, amount} = enve; 
            return <EnvelopeCard key={i}
                                 id={id}
                                 name={name}
                                 type={type}
                                 amount={amount}/>
        })
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>Dashboard</h1>
                    <Balance />
                    {list}
                    <Link to='/addenvelope'>
                        <button>Add New Envelope</button>
                    </Link>
                </div>
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

export default connect(mapStateToProps, {getUser, getTransactions, getEnvelopes, redirectFalse})(Dashboard);