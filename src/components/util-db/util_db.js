import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import VLED from '../fusion-vled/vled';
import REST from '../../classes/REST';
import './util_db.css';


/*
This page shows database related parameters such as 
the defined file groups, their allocated/used volumes.

TODO: 
* Show a list of file group objects and their sizes.  
* Show a the connection/queries made to the database.
*/

class UtilDB extends React.Component {
    state={};
    api = new REST();

    get_fgVolumes = () => {        
        this.api.query("EXEC uspfilegroup_volume")
        .then(data => {this.setState({fgVolumes: data})})            
    };


    componentDidMount() {
        this.get_fgVolumes();
    }


    render() {        
        return (
            <Fragment>
                <h1>DB Server: Rainier</h1>
                <div className='volumes'>
                    {
                    this.state.fgVolumes ? 
                    this.state.fgVolumes.map(fg => (<VLED key={fg['File Group']} title={`File Group: ${fg['File Group']}`} totalSpace={fg['Currently Allocated Space (MB)']} usedSpace={fg['Space Used (MB)']} />) ) 
                    : 
                    null
                    }
                </div>
            </Fragment>
        );
    }    
}

export default withRouter(UtilDB);