import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import VLED from '../fusion-vled/vled';
import RatingMeter from '../fusion-rating-meter/ratingMeter';

import REST from '../../classes/REST';
import './util_db.css';


/*
This page shows database related parameters such as 
the defined file groups, their allocated/used volumes.

TODO: 
* Show a list of file group objects and their sizes.  
* Show a the connection/queries made to the database.
*/




const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });




class UtilDB extends React.Component {
    state={};
    api = new REST();

    get_fgVolumes = () => {        
        this.api.query("EXEC uspfilegroup_volume")
        .then(data => {this.setState({fgVolumes: data, space: this.getUsedSpace(data)})})

    };



    getUsedSpace(data) {
            let totalSpace = 0;
            let usedSpace = 0;
            for (let i = 0; i < data.length; i++) {
                totalSpace += parseInt(data[i]['Currently Allocated Space (MB)']);
                usedSpace += parseInt(data[i]['Space Used (MB)']);
            }
            return {total: totalSpace, used: usedSpace};
    }



    componentDidMount() {
        this.get_fgVolumes();
    }


    render() {        

        const {classes} = this.props;

        return (
            <Fragment>
                <h1>DB Server: Rainier</h1>

                <div className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Paper className={classes.paper} elevation={3}>
                                {this.state.fgVolumes 
                                ?
                                <RatingMeter title={`Disk Usage: ${(this.state.space.used/(1024*1024)).toFixed(2)}TB / ${(this.state.space.total/(1024*1024)).toFixed(2)}TB`} value={this.state.space.used * 100 / this.state.space.total}/>
                                :
                                null
                                }
                            </Paper>
                        </Grid>    



                        <Grid item xs={12}>
                            <Paper className={classes.paper} elevation={3}>
                                <div className='volumes'>
                                    {
                                    this.state.fgVolumes ? 
                                    this.state.fgVolumes.map(fg => (
                                                                    <VLED key={fg['File Group']} title={`File Group: ${fg['File Group']}`} totalSpace={fg['Currently Allocated Space (MB)']} usedSpace={fg['Space Used (MB)']} />
                                                                    ) 
                                                            ) 
                                    : 
                                    null
                                    }
                                </div>
                            </Paper>
                        </Grid>    


                    </Grid>
                </div>


                
            </Fragment>
        );
    }    
}

export default withStyles(styles)(withRouter(UtilDB));