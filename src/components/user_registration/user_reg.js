import React from "react";
import REST from '../../classes/REST';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'



if (typeof(Highcharts) === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
}




class UsersReg extends React.Component {
  api = new REST();
  state = {
          chartOptions: {
            chart:{
              type: 'spline',
              zoomType: 'xy'
            },
            title: {
              text: 'User Registration'
            },
            credits:{
              enabled: false
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { 
                    month: '%b. %e. %Y',
                    year: '%Y'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'Cumulative User Counts'
                },
                min: 0
            },
            tooltip: {
              headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
              pointFormat: '<span style="font-size: 12px">Requests: {point.y}</span><br/>'
            },
            series: [
              { name: 'Cumulative Users',
                data: [] }
            ],  
            
            
            responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      plotOptions: {
                          series: {
                              marker: {
                                  radius: 2.5
                              }
                          }
                      }
                  }
              }]
          }
        }
  }

  
  updateSeries = () => {
    this.api.query("EXEC uspRegTrend")
    .then(res => {
      const mapper = (entry) =>  ( [Date.parse(entry.date.split('T')[0]), parseInt(entry.users)]) ;
      this.setState({
        chartOptions: {
          series: [{data: res.map(mapper)}]
        }
      });
    });
  }


  componentDidMount() {
    this.updateSeries();
  }


  render() {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={this.state.chartOptions} />  
      </div>
    );
  }
}



export default UsersReg;
