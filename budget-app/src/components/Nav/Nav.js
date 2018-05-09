import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default  function Nav(){
    return (
        <div className="nav_bar">
            <Link to='/dashboard'>
                <div className='nav_button' id='logo'>
                    <img src="./icons/ONvelope.png" alt=""/>
                </div>
            </Link>
            <Link to='/deposit'>
                <button className='nav_button' id='deposit'>
                <img src="./icons/deposit.png" alt=""/>
                Deposit</button>
            </Link>
            <Link to='/trans'>
                <button className='nav_button'>
                <img src="./icons/addtrans.png" alt=""/>
                Add Transaction</button>
            </Link>
            <Link to='/transactions'>
                <button className='nav_button'>
                <img src="./icons/alltrans.png" alt=""/>
                AllTrans</button>
            </Link>
            <Link to='/payday'>
                <button className='nav_button'>
                <img src="./icons/payday.png" alt=""/>
                Payday</button>
            </Link>
            <Link to='/plan'>
                <div className='nav_button'>
                    <img src="./icons/plan.png" alt="" className="icon"/>
                    <p>Plan</p>
                </div>
            </Link>
            <Link to='/move'>
                <button className='nav_button'>
                <img src="./icons/exchange.png" alt=""/>
                Move</button>
            </Link>
            <a href="http://localhost:3005/logout">
                <button className='nav_button' id='logout'>
                <img src="./icons/logout.png" alt=""/>
                Logout</button>
            </a> 
        </div>
    )
}