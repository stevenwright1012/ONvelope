import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import Balance from '../Balance/Balance'


class AllTransactions extends Component{

    render(){
        return(
            <div className='main'>
                <Nav />
                <div>
                    <h1>AllTransactions</h1>
                    <Balance />
                </div>
            </div>
        )
    }
}

export default AllTransactions;