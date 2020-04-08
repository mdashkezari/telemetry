import React from 'react';
import REST from '../../classes/REST';
import Highcharts from "highcharts/highstock";
import worldcloud from "highcharts/modules/wordcloud";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'

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
            this.setState({calls: data});
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
                
            <div style={{ height: 600, width: 800, fontSize: 10 }}>
                {this.state ? <HighchartsReact highcharts={Highcharts} options={

                                {
                                    chart:{
                                        type: 'wordcloud',
                                        zoomType: 'xy',
                                        height: 600,
                                        width: 800
                                    },
                                    title:{
                                        text: 'Queried Datasets'
                                    },
                                    credits:{
                                        enabled: false
                                    },
                                    rotation:{
                                        from: 0,
                                        orientations: 5,
                                        to: 90
                                    },
                                    series:[{
                                        name: 'Call Counts',
                                        data: this.arrayOfObjects(this.wordFreq(this.tableNames(this.state.calls)))
                                    }]
                                }

                } /> : <h1>Loading Dataset Word Cloud</h1>};
            </div>
        );
    }
}

export default WordCloud;