import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';
import MediaQuery from "react-responsive";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer>
      <MediaQuery maxWidth={1224}>
        <h2>CONTACT</h2>
        <div className="contact-container">
          {//https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
          }
          <img src="https://via.placeholder.com/100x100" alt="maps" />
          <div className="adress-container">
            <h4>L'Alcôve</h4>
            <p>229, avenue Jean Jaurès</p>
            <p>92140 Clamart</p>
            <p>01 46 38 11 17</p>
          </div>
          <div className="link-container">
            <ExternalLink href="https://www.facebook.com/lalcove">
              <span>F</span>
            </ExternalLink>
            <ExternalLink href="https://instagram.com/lalcove">
              <span>I</span>
            </ExternalLink>
            <Link to='/mentions-legales'>Mentions légales</Link>
          </div>
        </div>
        </MediaQuery>
      </footer>
    )
  }
}

export default Footer;