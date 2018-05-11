import React, {Component} from 'react';
import Nav from '../Nav/Nav';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {changePlan} from '../../ducks/reducer'
import './AddEnvelope.css'


class AddEnvelope extends Component{
    constructor(){
        super()

        this.state={
            name: '',
            type: ''
        }
    }
    AddNewEnvelope(){
        if(!this.state.name || !this.state.type){
            alert("Finish entering information")
        }
        else{
            axios.post('/api/addenvelope', {
                user_id: this.props.user.user_id,
                name: this.state.name,
                type: this.state.type
            }).then(res => {
                let eId = res.data[0].id
                let newPlan = Object.assign(this.props.payday, {[eId]:0} )

                this.props.changePlan(newPlan)
                this.props.history.push('/dashboard')
            })
        }
    }
    handleName(e){
        this.setState({
            name:e,
        })
    }
    handleType(e){
        this.setState({
            type: e
        })
    }
    render(){
        return(
            <div className='add_envelope_container'>
                <Nav />
                <div className="add_envelope_main">
                    <h1>
                        <u>
                            Add New Envelope
                        </u>
                    </h1>
                    <hr/>
                    <input className="new_env_input"
                    type="text" 
                    placeholder='Enter Name of Envelope...' 
                    value={this.state.name} 
                    onChange={(e) => this.handleName(e.target.value)}/>
                    <br/>
                    <select className='new_envelope_dropdown'
                    name="types" value={this.state.type} 
                    onChange={(e) => this.handleType(e.target.value)}>
                        <option value=''>Select Envelope Type</option>                 
                        <option value="Every day">Everyday spending</option>
                        <option value="Monthly Bill">Monthly bill</option>
                        <option value="Saving">Saving</option>
                        <option value="Debt">Debt</option>
                    </select>
                    <br/>
                    <button className="new_envelope_submit"
                    onClick={() => this.AddNewEnvelope()}>Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        payday: state.payday
    }
}

export default connect(mapStateToProps, {changePlan})(AddEnvelope);