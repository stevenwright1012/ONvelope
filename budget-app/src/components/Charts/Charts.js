import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import './Charts.css'
import {Bar} from 'react-chartjs-2'

class Charts extends Component{
    constructor(){
        super()

        this.state ={
            chartData: {
                labels: ['a', 'b', 'c'],
                datasets:[{
                    label: 'Balance',
                    data:[1,2,3]
                }],
                backgroundColor: ['rgba(0, 255, 0, 0.6)']
            },
        }
    }
    render(){
        return(
            <div className='chart_container' >
                <Nav />
                <div className='chart_main' >
                <h1>
                    <u>
                        Charts
                    </u>
                </h1>
                <hr className='depo_line'/>
                    <Bar
                        data={this.state.chartData}
                        options={{}}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        envelopes: state.envelopes
    }
}

export default connect(mapStateToProps)(Charts)