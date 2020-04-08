import React from 'react';
import {Link} from 'react-router-dom';
import './landing_page.css';
// import cmapLogo from '../../assets/logo/CMAP_128.png';


class LandingPage extends React.Component {
    render() {
        return (
            <div className='header'>
                <div className='logo-box'>
                    {/* <img src={cmapLogo} alt='CMAP Logo' className='cmap-logo' /> */}
                </div>

                <div className='heading-box'>
                    <h1 >
                        <span className='heading-main'>CMAP Telemetry</span>
                        <span className='heading-sub'>Track and Monitor Simons CMAP Stack</span>
                    </h1>
                    
                    <Link to='/utils' className='landing-btn'>Learn More</Link>                    
                </div>

                
            </div>
        );
    }
}

export default LandingPage;