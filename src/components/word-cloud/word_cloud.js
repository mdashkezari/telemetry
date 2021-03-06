import React from 'react';
import REST from '../../classes/REST';
import Highcharts from "highcharts/highstock";
import worldcloud from "highcharts/modules/wordcloud";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import CircularProgress from '@material-ui/core/CircularProgress';


if (typeof(Highcharts) === 'object') {
    worldcloud(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
}




class WordCloud extends React.Component{

    api = new REST();
    state = null;


    onFetchData = ()=>{
        this.api.query(`
                        select Table_Name [name], count(Table_Name) [weight] from tblAPI_Query q 
                        --join tblApi_Calls c on c.id=q.call_id
                        --where c.user_id not in (1,2,3,4,5,6,7,10)                         
                        group by Table_Name order by [weight] desc
                        `)
        .then(data => {
            this.setState({data: data
                                 .map(d=>({name: d.name.trim(), weight: parseInt(d.weight)}))
                                 .filter(d=>(d.name.length>0)) 
                           });
        })
    };


    componentDidMount() {
        this.onFetchData();
    }




    render(){

        return(
            <React.Fragment>  

                    {this.state ?                 
                    <HighchartsReact highcharts={Highcharts} options={
                    {                        
                        chart:{
                            type: 'column',
                            zoomType: 'xy'
                        },
                        title:{
                            text: 'Queried Datasets'
                        },
                        credits:{
                            enabled: false
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
                            pointFormat: '<span style="font-size: 12px">Requests: {point.y}</span><br/>'
                        },
                        xAxis: {
                            categories: this.state.data.map(table=>table.name),
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Number of Requests'
                            }
                        },
                        series:[{
                            name: 'Requests',
                            data: this.state.data.map(table=>table.weight)

                        }]
                    }
                    } /> 
                    : 
                    <CircularProgress color="inherit" />};


                {this.state ? 
                    <HighchartsReact highcharts={Highcharts} options={
                    {                        
                        chart:{
                            type: 'wordcloud',
                            zoomType: 'xy'
                        },
                        title:{
                            text: ''
                        },
                        credits:{
                            enabled: false
                        },
                        rotation:{
                            from: 0,
                            orientations: 5,
                            to: 90
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
                            pointFormat: '<span style="font-size: 12px">Requests: {point.weight}</span><br/>'
                        },
                        series:[{
                            name: 'Call Counts',
                            data: this.state.data
                        }]
                    }
                    } /> 
                    : 
                    <CircularProgress color="inherit" />};


            </React.Fragment>  

        );
    }
}

export default WordCloud;