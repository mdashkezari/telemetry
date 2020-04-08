import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import REST from '../../classes/REST';

ReactFC.fcRoot(FusionCharts, TimeSeries);



const dataSource = {
  chart: {},
  caption: {
    text: "User Registration"
  },
  subcaption: {
    text: ""
  },
  yaxis: [
    {
      plot: {
        value: "Registered Users",
        connectnulldata: true,
        style: {
            "plot.null": {
              "stroke-dasharray": "none",
              stroke: "#FF0000"
            }
          }

      },
      format: {
        prefix: ""
      },
      title: "Users"
    }
  ]
};

class UsersReg extends React.Component {
    api = new REST();
    state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "600",
        height: "400",
        dataSource
      }
    };

  

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData = () => {
    this.api.query("EXEC uspRegTrend").then(res => {
      const data = res;
      const schema = [
        {name: "date", type: "date", format: "%Y-%m-%dT00:00:00.000Z", column: "date", index: 0},
        {name: "users", type: "number", column: "users", index: 1}
      ];


      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }




  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}



export default UsersReg;
