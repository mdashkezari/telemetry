
import CSVParser from 'csv-parse';
import encoding from 'text-encoding';



class REST {
    baseURI = 'https://simonscmap.com';
    options = {headers: {Authorization: 'Api-Key 19e91d80-ae64-12e9-8f77-f3e8f5c1f730'}};
    

    encode_params = (params) => {
        // Takes the search parameters in form of a JS object and 
        // Returns an encoded query string.
        //
        // params: js object : search params to be encoded

        const sp = new URLSearchParams(params);
        return sp.toString();
    }



    uri = (route, params) => {
        // Takes an api route and search parameters.
        // Retuns the full encoded URI.
        // 
        // route: string : api route
        // params: js object : search params to be encoded

        return this.baseURI + route + this.encode_params(params) ;
    }



    atomic_request = async(uri) => {
        // Takes an encoded URI and submits a single API request.
        // Retuns the results in form of a js object.
        // 
        // uri: string : encoded uri


        let data = [];
        const decoder = new encoding.TextDecoder();
        let csvParser = CSVParser({columns:true});
        csvParser.on('readable', function(){
            let record;
            while (record = csvParser.read()) {data.push(record)}
        })    
        let response = await fetch(uri, this.options);
        if(!response.ok) return false;
        let body = response.body;
        let reader = body.getReader();
        let readerIsDone = false;
        while(!readerIsDone){
            let chunk = await reader.read();
            if(chunk.done) {
                readerIsDone = true;
            }
            else {
                csvParser.write(decoder.decode(chunk.value));
            };
        }
        return data;
    }


    query = (queryStatement) => {
        // Submits a SQL query statement.
        // Retuns the results in form of a js object.
        // 
        // queryStatement: string : SQL statement

        const uri = this.uri('/api/data/query?', {query: queryStatement, servername: 'rainier'})
        return this.atomic_request(uri);
    }

        
    stored_proc = (spName, table, variable, dt1, dt2, lat1, lat2, lon1, lon2, depth1, depth2) => {
        // Submits a SQL strored-procedure.
        // Retuns the results in form of a js object.
        // 
        // spName: string : stored_procedure name.
        // table: string : table name.
        // variable: string : variable name.
        // lat1: float : start latitude.
        // lat2: float : end latitude.
        // lon1: float : start longitude.
        // lon2: float : end longitude.
        // depth1: float : start depth.
        // depth2: float : end depth.

        let queryStatement = "EXEC "+spName+" '"+table+"', '"+variable+"', '"+dt1+"', '"+dt2+"', "+lat1+", "+lat2+", "+lon1+", "+lon2+", "+depth1+", "+depth2;
        const uri = this.uri('/api/data/query?', {query: queryStatement, servername: 'rainier'})
        return this.atomic_request(uri);

    }


    get_catalog = () => {
        // Returns CMAP catalog in form of a js object.
        // 
        // no input.

        return this.query('EXEC uspCatalog');
    }


    space_time = (table, variable, dt1, dt2, lat1, lat2, lon1, lon2, depth1, depth2) => {
        // Returns a subset of data according to space-time constraints.
        // The results are ordered by time, lat, lon, and depth (if exists).

        return this.stored_proc('uspSpaceTime', table, variable, dt1, dt2, lat1, lat2, lon1, lon2, depth1, depth2);
    }
          
    
}


export default REST;