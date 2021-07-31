import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';
import MediaQuery from "react-responsive";
import "./Footer.css";
import facebook from '../images/facebook.svg'
import instagram from '../images/instagram.svg'

class Footer extends React.Component {
  render() {
    return (
      <footer>
      <div className="title-footer">
      <h2>CONTACT</h2>
      </div>
        <div className="contact-container">
          {//https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
          }
          <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.395923056491!2d2.2689040161119554!3d48.81250677928298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67a7f2b67303d%3A0xdb6205a4a37f39dc!2zTCdBbGPDtHZl!5e0!3m2!1sfr!2sfr!4v1627631024018!5m2!1sfr!2sfr" ></iframe>
          
          <div className="footer-box">
          <div className="adress-container">
            <h4>L'Alcôve</h4>
            <p>229, avenue Jean Jaurès</p>
            <p>92140 Clamart</p>
            <p>01 46 38 11 17</p>
          </div>
          <ExternalLink href="https://www.planity.com/">
              <p>Prendre rendez-vous</p> 
              <p>en ligne</p>
          </ExternalLink>
          </div>
          </div>
          <div className="link-container">
            <ExternalLink href="https://www.facebook.com/lalcove">
              <img src={facebook} alt='logoFacebook'/>
            </ExternalLink>
            <ExternalLink href="https://instagram.com/lalcove">
             <img src={instagram} alt='logoInstagram'/>
            </ExternalLink>
            <Link to='/mentions-legales'>Mentions légales</Link>
          </div>
        
      </footer>
    )
  }
}

export default Footer;