import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import Widgets from 'fusioncharts/fusioncharts.widgets';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);
// Resolves charts dependancy
charts(FusionCharts);


const dataSource = {
  chart: {
    caption: "Resource Usage (placeholder)",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "fusion",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F"
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533"
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "81"
      }
    ]
  }
};

class RatingMeter extends React.Component {

  render() {
    return (
      <ReactFusioncharts
        type="angulargauge"
        width="700"
        height="400"
        dataFormat="JSON"
        dataSource={{
          chart: {
            caption: this.props.title,
            lowerlimit: "0",
            upperlimit: "100",
            showvalue: "1",
            numbersuffix: "%",
            theme: "fusion",
            showtooltip: "0"
          },
          colorrange: {
            color: [
              {
                minvalue: "0",
                maxvalue: "50",
                code: "#62B58F"
              },
              {
                minvalue: "50",
                maxvalue: "75",
                code: "#FFC533"
              },
              {
                minvalue: "75",
                maxvalue: "100",
                code: "#F2726F"
              }
            ]
          },
          dials: {
            dial: [
              {
                value: this.props.value
              }
            ]
          }
        }}
      />
    );
  }
}


export default RatingMeter;
