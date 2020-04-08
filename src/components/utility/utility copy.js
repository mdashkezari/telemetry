import React from 'react'
import './utility.css'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router';

/*
Renders an individual utility in form of a card.

props: utility object defined in the home component.
*/

const Utility = (props) => {
    return (
        // <div className='utility-container' onClick={()=>{
        <div className='card' onClick={()=>{
                // props.history.push(`/utils/${props.utility.name}`.toLowerCase());
        }}>
            <div className='front-side'>
                {/* <div className='front-heading'>
                    {props.utility.name}
                </div> */}
                
                <div className='card-icon-div'>
                    {props.utility.icon}
                </div>
            </div>
            <div className='card back-side'>
                <div className='card back-heading'>
                    {props.utility.longName}
                </div>
                <Link to={`/utils/${props.utility.name}`.toLowerCase()} className='landing-btn card'>run</Link> 
            </div>
        </div>
    );
};



export default withRouter(Utility);