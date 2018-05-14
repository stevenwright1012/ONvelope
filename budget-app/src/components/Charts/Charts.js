import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
// import {Line} from 'react-chartjs-2'

class Charts extends Component{
    // constructor(){
    //     super()

    //     this.state ={
    //         chartData: {
    //             labels: this.props.envelopes.map(enve => {
    //                 return enve.name;
    //             }),
    //             datasets:[]
    //         },
    //         chartOptions: {
    //             title: {
    //                 display: true,
    //                 text: "Envelopes",
    //                 fontSize: 20
    //             },
    //             animation:{
    //                 duration: 1500,
    //             }
    //         }
    //     }
    // }
    render(){
        return(
            <div>
                <Nav />
                <div>
                    <h1>Charts</h1>
                    {/* <Line data={this.state.chartData} options={this.state.chartOptions}/> */}
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