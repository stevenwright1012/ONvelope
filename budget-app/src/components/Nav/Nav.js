import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default  function Nav(){
    return (
        <div className="nav_bar">
            <Link to='/dashboard'>
                <div className='logo'>
                    <img src="http://www.iconarchive.com/download/i95978/iconsmind/outline/Envelope.ico" alt=""/>
                </div>
            </Link>
            <Link to='/deposit'>
                <button className='deposit'>Deposit</button>
            </Link>
            <Link to='/trans'>
                <button>Trans</button>
            </Link>
            <Link to='/payday'>
                <button>Payday</button>
            </Link>
            <Link to='/transactions'>
                <button>AllTrans</button>
            </Link>
            <Link to='/plan'>
                <button>Plan</button>
            </Link>
            <Link to='/dashboard'>
                <button>Move</button>
            </Link>
            <Link to='/'>
                <button className='logout'>Logout</button>
            </Link>
        </div>
    )
}