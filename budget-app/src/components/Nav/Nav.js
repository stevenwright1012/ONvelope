import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default  function Nav(){
    return (
        <div className="nav_bar">
            <Link to='/dashboard'>
                <div className='nav_button' id='logo'>
                    <img src="http://www.iconarchive.com/download/i95978/iconsmind/outline/Envelope.ico" alt=""/>
                </div>
            </Link>
            <Link to='/deposit'>
                <button className='nav_button' id='deposit'>Deposit</button>
            </Link>
            <Link to='/trans'>
                <button className='nav_button'>addTrans</button>
            </Link>
            <Link to='/transactions'>
                <button className='nav_button'>AllTrans</button>
            </Link>
            <Link to='/payday'>
                <button className='nav_button'>Payday</button>
            </Link>
            <Link to='/plan'>
                <button className='nav_button'>Plan</button>
            </Link>
            <Link to='/move'>
                <button className='nav_button'>Move</button>
            </Link>
            <Link to='/'>
                <button className='nav_button' id='logout'>Logout</button>
            </Link>
        </div>
    )
}