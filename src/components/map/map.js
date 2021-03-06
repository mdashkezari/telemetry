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
        text: " Requests Spatial Distribution<br/>Loading... "
      },
      credits: {
        enabled: false
      },
      mapNavigation: {
        enabled: false
      },
      tooltip: {
        headerFormat: "",
        pointFormat:"Requests: {point.requests}<br/> Country: {point.country}<br/> Region: {point.regionName}<br/> City: {point.city}<br/> Latitude: {point.lat}<br/> Longitude: {point.lon}"
      },
      series: null
    }
    }



/*

with callers as (
select ip_address, lat, lon, country, city, region, regionName,
count(c.Ip_Address) over(partition by c.Ip_Address) as calls,
rank() over(partition by ip_address order by call_id desc) as [rank]
from tblAPI_Spatial s
join tblApi_Calls c on c.id=s.call_id
where c.Query IS NOT NULL
--and c.User_ID NOT IN (1, 2, 4, 5, 6, 7, 10)
)
select * from callers where [rank]=1
order by calls desc





with callers as (
select lat, lon, country, city, region, regionName, 
count(call_id) over(partition by lat, lon) as calls,
rank() over(partition by lat, lon order by call_id) as [rank]
from tblAPI_Spatial
)
select calls, lat, lon, country, city, region, regionName from callers where [rank]=1
order by calls desc



*/

  updateSeries = async () => {
    let geoLocs = [];
    let calls = await this.api.query(`
    with callers as (
      select ip_address, lat, lon, country, city, region, regionName,
      count(c.Ip_Address) over(partition by c.Ip_Address) as calls,
      rank() over(partition by ip_address order by call_id desc) as [rank]
      from tblAPI_Spatial s
      join tblApi_Calls c on c.id=s.call_id
      where c.Query IS NOT NULL
      and c.User_ID NOT IN (1, 2, 4, 5, 6, 7, 10)
      )
      select * from callers where [rank]=1
      order by calls desc             
    `);


    for (let i in calls){
            geoLocs.push({z: parseInt(calls[i].calls), requests: calls[i].calls, country: calls[i].country, regionName: calls[i].regionName, city: calls[i].city, lat: parseFloat(calls[i].lat), lon: parseFloat(calls[i].lon) })            
    }

    this.setState({
        chartOptions: {
          title: {
            text: " Requests Spatial Distribution "
          },
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
