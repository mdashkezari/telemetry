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
        <div className='card'>
            <div className='card-side'>
                
                <div className='card card-side front-side'>
                    {/* <div className='front-heading'>
                        {props.utility.name}
                    </div> */}                
                    <div className='card-icon-div'>
                        {props.utility.icon}
                    </div>
                </div>



                <div className='card card-side back-side'>
                    <div className='card back-heading'>
                        {props.utility.longName}
                    </div>
                    <p className='card desciption'>
                        {props.utility.description}
                    </p>
                    <Link to={`/utils/${props.utility.name}`.toLowerCase()} className='landing-btn'>run</Link>  
                </div>


            </div>
        </div>
    );
};



export default withRouter(Utility);