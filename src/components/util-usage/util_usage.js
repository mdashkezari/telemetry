import React from 'react';
import { withRouter } from 'react-router';
import WordCloud from '../word-cloud/word_cloud';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import UserReg from '../user_registration/user_reg';
import GeoCalls from '../map/map';
import AppCalls from '../apps/app_calls';
import Calls from '../calls/calls';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));


function Usage() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <h1>Usage Stat Page</h1>
            <div className={classes.root}>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={3}>
                            <UserReg />
                        </Paper>
                    </Grid>                        


                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <Calls />
                        </Paper>
                    </Grid>                        


                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <GeoCalls />
                        </Paper>
                    </Grid>  


                    {/* <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <AppCalls />
                        </Paper>
                    </Grid>                         */}


                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={3}>
                            <WordCloud />
                        </Paper>
                    </Grid>                        


                </Grid>
            </div>
        </React.Fragment>    
    );
}



export default withRouter(Usage);