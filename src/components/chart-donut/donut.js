import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {},
//       series: [44, 55, 41, 17, 15],
//       labels: ['A', 'B', 'C', 'D', 'E']
//     }
//   }

  render() {

    return (
      <div className="donut">
        <h1>{this.props.title}</h1>  
        <Chart options={this.props.options} series={this.props.series} type="donut" width="380" />
      </div>
    );
  }
}

export default Donut;





// const Donut = (props) => {
//     return (
//         <div className="donut">
//         <Chart options={props.options} series={props.series} type="donut" width="380" />
//       </div>
//     );    
// };

// export default Donut;