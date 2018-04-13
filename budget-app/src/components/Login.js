import React, {Component} from 'react';
import {connect} from 'react-redux';

class Login extends Component{
    render(){
        return(
            <div>
                <h1>Login</h1>
                <h2>{this.props.login}</h2>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        login: state.login
    }
}
export default connect(mapStateToProps)(Login);