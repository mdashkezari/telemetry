import React from "react";
import REST from '../../classes/REST';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import proj4 from 'proj4';
import mapDataIE from '@highcharts/map-collection/custom/world.geo.json';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'



if (typeof(Highcharts) === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
}

window.proj4 = window.proj4 || proj4;
highchartsMap(Highcharts);


class GeoCalls extends React.Component {
  api = new REST();
  state = {
          chartOptions: {
            chart: {
                map: "custom/world",
                zoomType: 'xy'
              },
              title: {
                text: " Calls Spatial Distribution "
              },
              credits: {
                enabled: false
              },
              mapNavigation: {
                enabled: false
              },
              tooltip: {
                headerFormat: "",
                pointFormat: "lat: {point.lat}, lon: {point.lon}"
              },
              series: []
         }
  }



  geoIP = async (ip) => {
      try {
        const res = await fetch('http://ip-api.com/json/'+ip);
        const geo = await res.json();
        return geo
      } catch(err) {
          console.log(err);
          return null
      }
  };


  

  updateSeries = async () => {
    let geoLocs = [];
    let calls = await this.api.query("EXEC uspCalls_IP");
    calls = calls.slice(0, 50);
    for (let i in calls){
        const geo = await this.geoIP(calls[i].IP);
        if (geo) {
            geoLocs.push({z: parseInt(calls[i].Calls), keyword: "Galway", lat: geo.lat, lon: geo.lon })
        }    

        
    }

    this.setState({
        chartOptions: {
            series: [
                {
                    name: "Basemap",
                    mapData: mapDataIE,
                    borderColor: "#A0A0A0",
                    nullColor: "rgba(200, 200, 200, 0.3)",
                    showInLegend: false
                },
                {                    
                    type: "mapbubble",
                    name: "Locations",
                    color: "#4169E1",
                    data: geoLocs,
                    cursor: "pointer",
                    point: {
                        events: {
                        click: function() {
                            // console.log(this.keyword);
                        }
                        }
                    }
                }              
            ]
        }
        });
               


  }




  componentDidMount() {
    this.updateSeries();
  }


  render() {
    return (
      <div>
        <HighchartsReact 
        constructorType={'mapChart'}
        highcharts={Highcharts} 
        options={this.state.chartOptions} 
        />  
      </div>
    );
  }
}



export default GeoCalls;
