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
        this.api.query("EXEC uspCalls_Query")
        .then(data => {
            // this.setState( {tables: this.arrayOfObjects( this.wordFreq(this.tableNames(data)))});
            this.setState({calls: data,
                           tableCalls: this.arrayOfObjects(this.wordFreq(this.tableNames(data))).sort((a, b) => (a.weight > b.weight) ? -1 : 1) 
                            });
        })
    };


    componentDidMount() {
        this.onFetchData();
    }


    wordFreq(string) {
        return string.toLowerCase().replace(/[.]/g, '')
          .split(/\s/)
          .reduce((map, word) =>
            Object.assign(map, {
              [word]: (map[word])
                ? map[word] + 1
                : 1,
            }),
            {}
          );
      };

    arrayOfObjects(obj){
        let arr = [];
        for (let [key, value] of Object.entries(obj)) {
            // if (String(key).length > 0) {arr.push({text: `${key}`, value: value})}
            if (String(key).length > 0) {arr.push({name: `${key}`, weight: value})}
        }      
        return arr;
      }
    

    extractTableName = (str) => {
        let splitter = ' ';
        if (str[0]==="{") {splitter = '"'}
        let tbl = str.split(splitter).filter(s => s.toLowerCase().includes('tbl'))[0];
        if (tbl.split("'").length>2) {tbl = tbl.split("'")[1]} 
        if (tbl.split('"').length>2) {tbl = tbl.split('"')[1]}  
        return tbl.slice(3);
    }
    
    
    tableNames = (calls) => {
        return calls.map(call=>(this.extractTableName(call.Query))).join(' ');
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
                            categories: this.state.tableCalls.map(table=>table.name),
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
                            data: this.state.tableCalls.map(table=>table.weight)

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
                            data: this.state.tableCalls
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