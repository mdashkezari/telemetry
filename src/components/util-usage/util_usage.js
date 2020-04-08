import React from 'react';
import { withRouter } from 'react-router';
// import UserReg from '../fusion-timeseries/user_reg';
import WordCloud from '../word-cloud/word_cloud';
import UserReg from '../user_registration/user_reg';
import GeoCalls from '../map/map';
import AppCalls from '../apps/app_calls';
import Calls from '../calls/calls';

class Usage extends React.Component {



    render() {
        return (
            <div>
                <h1>Usage Stat Page</h1>
                <UserReg />
                <Calls />
                <AppCalls />
                {/* <WordCloud /> */}
                {/* <GeoCalls /> */}

            </div>
        );
    }
}



export default withRouter(Usage);