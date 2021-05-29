import React from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);


class VLED extends React.Component {


       

    render() {
        const coef = this.props.totalSpace;
        let dataSource = {
            chart: {
              caption: this.props.title,
              subcaption: "(Mega Byte)",
              upperlimit: this.props.totalSpace,
              numbersuffix: " MB",
              showvalue: "0",
              chartbottommargin: "50",
              ledgap: "1",
              theme: "fusion"
            },
            colorrange: {
              color: [
                {
                  minvalue: 0.5 * coef,
                  maxvalue: 0.75 * coef,
                  code: "#80dfff"
                },
                {
                  minvalue: 0.75 * coef,
                  maxvalue: 0.90 * coef,
                  code: "#ff944d"
                },
                {
                  minvalue: 0.90 * coef,
                  maxvalue: 1 * coef,
                  code: "#ff3300"
                }
              ]
            },
            value: this.props.usedSpace
          };

        return (
        <ReactFusioncharts
            type="vled"
            width="300"
            height="600"
            dataFormat="JSON"
            dataSource={dataSource}
        />
        );
  }
}

export default VLED;
