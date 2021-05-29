import React from 'react'
import './home.css'
import Utility from '../utility/utility' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faCogs,  faUsers} from '@fortawesome/free-solid-svg-icons'


/*
Renders the list of utilities designed in this app inform of a grid (see home.css).
The look and feel of each utility card is set in the "Utility" componenet.

props: no props.
*/


const Home = (props) => {
    // list of utilities
    const utilities = [
        {
            id: 0,
            name:'DB',
            longName: 'Database Servers',
            description: 'Shows a selected number of important database metrics such as: DB size, DB objects, and index fragmentations. Cluster metrics will shown on its own independent utility.',
            icon: <FontAwesomeIcon className='card-icon' icon={faDatabase} />
        },
        {
            id: 1,
            name:'API',
            longName: 'REST API',
            description: 'Monitors the cloud REST API. Potentially, it provides a direct readout from cloud (AWS) monitors such as the number of deployed instances, instance status, and CPU-Memory usages.',
            icon: <FontAwesomeIcon className='card-icon' icon={faCogs} />
        },
        {
            id: 2,
            name:'Usage',
            longName: 'Usage Statistics',
            description: 'Provides a view of the system user-base. Trends associated with user registrations, active users, unregistered queries, and data set usages are among what is found here.',
            icon: <FontAwesomeIcon className='card-icon' icon={faUsers} />
        }
    ];

    return (
        <React.Fragment>   
            <div className='utility-home-heading'>       
                <h1 className='utility-home-heading-main'>Utilities</h1>   
                <p className='utility-home-heading-sub'>more to come...</p> 
            </div>     
            <div className='home'>
                {utilities.map(utility => (<Utility key={utility.id} utility={utility} />))}
            </div>
        </React.Fragment>
    );
}; 



export default Home;