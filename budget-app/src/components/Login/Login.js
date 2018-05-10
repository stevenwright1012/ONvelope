import React from 'react';
import './Login.css'

export default  function Login(){
    return (
        <div className='login'>
            <h1>Welcome to <u>ONvelope!</u></h1>
            <div className="logo_container">
                <a href='http://localhost:3005/auth'>
                    <img src="./icons/Onvelope.png" alt="" className="login_logo"/>
                </a>
            </div>
            <h2>The best way to get <u>ON</u> top of your finances</h2>
            <h3>To get started, click on the&nbsp;
                <u>
                    <a href='http://localhost:3005/auth'>
                        ONvelope! 
                    </a>
                </u>
                &nbsp;logo   
             </h3>
            <div id="atribute">
                Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
            </div>
        </div>
    )
}