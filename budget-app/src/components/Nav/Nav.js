import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default  function Nav(){
    return (
        <div className="nav_bar">
            <Link to='/dashboard'>
                <div className='nav_button' id='logo'>
                    <img src="./icons/ONvelope.png" alt="" className="icon"/>
                </div>
            </Link>
            <Link to='/deposit'>
                <button className='nav_button' id='deposit'>
                <img src="./icons/deposit.png" alt="" className="icon"/>
                Deposit</button>
            </Link>
            <hr className='butt_lines'/>
            <Link to='/trans'>
                <button className='nav_button'>
                <img src="./icons/addtrans.png" alt="" className="icon"/>
                <span>Trans-</span>
                <span>action</span>
                </button>
            </Link>
            <hr className='butt_lines'/>            
            <Link to='/transactions'>
                <button className='nav_button'>
                <img src="./icons/alltrans.png" alt="" className="icon"/>
                All</button>
            </Link>
            <hr className='butt_lines'/>            
            <Link to='/payday'>
                <button className='nav_button'>
                <img src="./icons/payday.png" alt="" className="icon"/>
                Payday</button>
            </Link>
            <hr className='butt_lines'/>            
            <Link to='/plan'>
                <button className='nav_button'>
                    <img src="./icons/plan.png" alt="" className="icon"/>
                    Plan
                </button>
            </Link>
            <hr className='butt_lines'/>            
            <Link to='/move'>
                <button className='nav_button'>
                <img src="./icons/exchange.png" alt="" className="icon"/>
                Move</button>
            </Link>
            <hr className='butt_lines'/>            
            <a href="http://localhost:3005/logout">
                <button className='nav_button' id='logout'>
                <img src="./icons/logout.png" alt="" className="icon"/>
                Logout</button>
            </a> 
        </div>
    )
}