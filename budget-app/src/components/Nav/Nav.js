import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default  function Nav(){
    const {REACT_APP_LOGOUT} = process.env
    
    return (
        <div className="nav_bar">
            <Link to='/dashboard'>
                <div className='nav_button' id='logo'>
                    <img src="./icons/ONvelope.png" alt="" className="logoImg"/>
                </div>
            </Link>
            <Link to='/deposit'>
            <div className='nav_button'>
            
                <button id='deposit'>
                <img src="./icons/deposit.png" alt="" className="icon"/>
                </button>
                <p>Deposit</p>
            </div>
            </Link>
            
            <Link to='/trans'>
            <div className='nav_button'>
            
                <button >
                <img src="./icons/addtrans.png" alt="" className="icon"/>

                </button>
                <p>Trans</p>
            </div>            
            </Link>
                        
            <Link to='/transactions'>
            <div className='nav_button'>
            
                <button >
                <img src="./icons/alltrans.png" alt="" className="icon"/>
                </button>
                <p>All-Trans</p>
            </div>
        
            </Link>
                        
            <Link to='/payday'>
            <div className='nav_button'>
            
                <button >
                <img src="./icons/payday.png" alt="" className="icon"/>
                </button>
                <p>Payday</p>
            </div>                
            </Link>
                        
            <Link to='/plan'>
            <div className='nav_button'>
                <button >
                    <img src="./icons/plan.png" alt="" className="icon"/>
                </button>
                <p>Plan</p>
            </div>
            </Link>
                        
            <Link to='/move'>
            <div className='nav_button'>
            
                <button >
                <img src="./icons/exchange.png" alt="" className="icon"/>
                </button>
                <p>Move</p>
            </div>                
            </Link>        
            <div className='nav_button' id='logout'>
                <a href={REACT_APP_LOGOUT}>
                    <button className="logoutBtn" >
                    <img src="./icons/logout.png" alt="" className="icon"/>
                    </button>
                    <p>Logout</p>
                </a> 
            </div>
        </div>
    )
}