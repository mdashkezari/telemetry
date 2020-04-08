import React from 'react';
import { withRouter } from 'react-router';

// import Line from '../fusion-line/line';
import RatingMeter from '../fusion-rating-meter/ratingMeter';


const UtilAPI = ()=>{
    return (
        <div>
            <h1>API Page</h1>
            {/* <Line /> */}
            <RatingMeter />
        </div>
    );
}



export default withRouter(UtilAPI);