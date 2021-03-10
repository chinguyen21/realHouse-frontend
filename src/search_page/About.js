import React, {useState} from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';

const About = () => {

  return(
          <div className="about">
            <hr className="about-line"/>
            <div className="about-1">
             <div>About us</div>       
             <div>Legal Notices</div>       
             <div>Privacy Statement</div>       
             <div>Equal Housing</div>       
             <div>Avoid Scams</div>       
             <div>Accessibility</div>       
             <div>Site Map</div>
            </div>         

            <div className="about-2">
              <div>© 2021 RealHome, Inc. All rights reserved</div>
              <div><InstagramIcon/> <FacebookIcon/><TwitterIcon/><GitHubIcon/></div>
            </div>         
          </div>  
  )
}

export default About;