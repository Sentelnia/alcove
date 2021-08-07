import React from "react";
import './Services.css'
import wonder from '../images/wonder.jpeg'
// import { Link } from "react-router-dom";

//le commentaire qui suit est pour enlever les petites lignes jaunes sur mon vs code car c'est très desagréable !
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  render() {
    return (
      <div className="services">
        <img src={wonder} alt="wonder"/>
        <div className="servicesCategory" id="servicesLash">
        
          <h3>BEAUTÉ DES CILS</h3>

          <div className="servicesBox">
            <h4>LES EXTENSIONS</h4>

            <article className="serviceDetails">
              <p>Pose complète cil à cil</p>
              <span>150 €</span>
            </article>
            <article className="serviceDetails">
              <p>Retouche (à 3 semaines maximum)</p>
              <span>55 €</span>
            </article>
            <article className="serviceDetails">
              <p>Pose complète volume russe</p>
              <span>200 €</span>
            </article>
            <article className="serviceDetails">
              <p>Retouche (à 3 semaines maximum)</p>
              <span>75 €</span>
            </article>
            <article className="serviceDetails">
              <p>Pose mixte</p>
              <span>175 €</span>
            </article>
            <article className="serviceDetails">
              <p>Retouche (à 3 semaines maximum)</p>
              <span>65 €</span>
            </article>
            <article className="serviceDetails">
              <p>Dépose</p>
              <span>30 €</span>
            </article>
            <article className="serviceDetails">
              <p>Strass de cil</p>
              <span>5 €</span>
            </article>
          </div>

          <div className="servicesBox">
            <h4>EMBELLISSEMENT NATUREL</h4>

            <article className="serviceDetails">
              <p>Rehaussement de cils</p>
              <span>70 €</span>
            </article>
            <article className="serviceDetails">
              <p>Teinture de cils</p>
              <span>25 €</span>
            </article>
            <article className="serviceDetails">
              <p>Rehaussement de cils + teinture</p>
              <span>90 €</span>
            </article>
          </div>
          <div className='cartFid'>
          <p>« Carte de fidélité cils » : au bout du 4ème tampon,-15€ sur la prestation suivante (carte valable 6 mois )</p>
          </div>
        </div>

        <div className="servicesCategory" id="servicesNail">
          <h3>BEAUTÉ DES ONGLES // MAINS</h3>

          <div className="servicesBox">
            <h4>LE GEL</h4>

            <article className="serviceDetails">
              <p>Rallongement au gel french ou couleur</p>
              <span>60 €</span>
            </article>
            <article className="serviceDetails">
              <p>Remplissage gel french ou couleur</p>
              <span>50 €</span>
            </article>
            <article className="serviceDetails">
              <p>Dépose gel</p>
              <span>20 €</span>
            </article>
            <article className="serviceDetails">
              <p>Ongle cassé</p>
              <span>5 €</span>
            </article>
            <article className="serviceDetails">
              <p>Décoration / Strass </p>
              <span> À partir de 1 € /ongle</span>
            </article>
          </div>

          <div className="servicesBox">
            <h4>LES VERNIS</h4>

            <article className="serviceDetails">
              <p>Vernis semi-permanent french ou couleur avec manucure </p>
              <span>40 €</span>
            </article>
            <article className="serviceDetails">
              <p>Dépose vernis semi-permanent</p>
              <span>15 €</span>
            </article>
            <article className="serviceDetails">
              <p>Pose de vernis avec préparation de l’ongle</p>
              <span>15 €</span>
            </article>
          </div>

          <div className="servicesBox">
            <h4>LES SOINS</h4>

            <article className="serviceDetails">
              <p>Beauté des mains avec modelage relaxant </p>
              <div className='priceDetail'>
              <span>25 €</span>
              <span>(avec vernis + 10 €)</span>
              </div>
            </article>
            <article className="serviceDetails">
              <p>Soin des mains hydratation intense - 1 heure</p>
              <div className='priceDetail'>
              <span>60 €</span>
              <span>(avec vernis + 10 €)</span>
              </div>
              
            </article>
          </div>
        </div>

        <div className="servicesCategory">
          <h3>BEAUTÉ DES ONGLES // PIEDS</h3>

          <div className="servicesBox">
            <h4>LE GEL ET LE VERNIS</h4>

            <article className="serviceDetails">
              <p>Pose de gel french ou couleur</p>
              <span>40 €</span>
            </article>
            <article className="serviceDetails">
              <p>Pose de vernis</p>
              <span>15 €</span>
            </article>
            <article className="serviceDetails">
              <p>Ongle cassé</p>
              <span>5 €</span>
            </article>
            <article className="serviceDetails">
              <p>Décoration / Strass </p>
              <span> À partir de 1 € /ongle</span>
            </article>
          </div>

          <div className="servicesBox">
            <h4>LES SOINS</h4>

            <article className="serviceDetails">
              <p>Beauté des pieds avec modelage relaxant </p>
              <div className='priceDetail'>
              <span>35 €</span>
              <span>(avec vernis + 8 €)</span>
              </div>
              
           
            </article>
            <article className="serviceDetails">
              <p>Beauté des pieds hydratation intense - 1 heure</p>
              <div className='priceDetail'>
              <span>60 €</span>
              <span>(avec vernis + 8 €)</span>
              </div>
              
              
            </article>
            <article className="serviceDetails">
              <p>Soin Callus Peeling</p>
              <span>40 €</span>
            </article>
          </div>
          <div className='cartFid'>
          <p>« Carte de fidélité onglerie » : au bout du 4ème tampon, la prestation suivante à -10% (carte valable un an)</p>
          </div>
        </div>
      </div>
    );
  }
}
