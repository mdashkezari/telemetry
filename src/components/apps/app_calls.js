import React from 'react';
import REST from '../../classes/REST';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'



if (typeof(Highcharts) === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
}





class AppCalls extends React.Component {
    api = new REST();
    state = {
        chartOptions: {
          chart:{
            type: 'spline',
            zoomType: 'xy'
          },
          title: {
            text: 'Daily-Averaged Query Response Time [ms]'
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
                  text: 'Daily-Averaged Query Response Time [ms]'
              },
              min: 0
          },

          series: [
            { name: 'Response Time',
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
  this.api.query("EXEC uspCalls_Response")
  .then(res => {
    const mapper = (entry) =>  ( [Date.parse(entry.Date.split('T')[0]), parseInt(entry.Response_Time)]) ;
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

export default AppCalls;