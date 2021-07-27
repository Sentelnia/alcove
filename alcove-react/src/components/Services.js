import React from "react";

import { Link } from "react-router-dom";

//le commentaire qui suit est pour enlever les petites lignes jaunes sur mon vs code car c'est très desagréable !
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  render() {
    return (
      <div className="services">
        <section className="servicesCategory">
          <h1>BEAUTÉ DES CILS</h1>

          <div className="servicesBox">
            <h2>LES EXTENSIONS</h2>

            <div className="serviceDetails">
              <p>Pose complète cil à cil</p>
              <span>150 €</span>
            </div>
            <div className="serviceDetails">
              <p>Retouche (à 3 semaines maximum)</p>
              <span>55 €</span>
            </div>
            <div className="serviceDetails">
              <p>Pose complète volume russe</p>
              <span>200 €</span>
            </div>
            <div className="serviceDetails">
              <p>Retouche (à 3 semaines maximum)</p>
              <span>75 €</span>
            </div>
            <div className="serviceDetails">
              <p>Pose mixte</p>
              <span>175 €</span>
            </div>
            <div className="serviceDetails">
              <p>Retouche (à 3 semaines maximum)</p>
              <span>65 €</span>
            </div>
            <div className="serviceDetails">
              <p>Dépose</p>
              <span>30 €</span>
            </div>
            <div className="serviceDetails">
              <p>Strass de cil</p>
              <span>5 €</span>
            </div>
          </div>

          <div className="servicesBox">
            <h2>EMBELLISSEMENT NATUREL</h2>

            <div className="serviceDetails">
              <p>Rehaussement de cils</p>
              <span>70 €</span>
            </div>
            <div className="serviceDetails">
              <p>Teinture de cils</p>
              <span>25 €</span>
            </div>
            <div className="serviceDetails">
              <p>Rehaussement de cils + teinture</p>
              <span>90 €</span>
            </div>
          </div>
          <div className='cartFid'>
          <p>« Carte de fidélité cils » : au bout du 4ème tampon,-15€ sur la prestation suivante (carte valable 6 mois )</p>
          </div>
        </section>

        <section className="servicesCategory">
          <h1>BEAUTÉ DES ONGLES // MAINS</h1>

          <div className="servicesBox">
            <h2>LE GEL</h2>

            <div className="serviceDetails">
              <p>Rallongement au gel french ou couleur</p>
              <span>60 €</span>
            </div>
            <div className="serviceDetails">
              <p>Remplissage gel french ou couleur</p>
              <span>50 €</span>
            </div>
            <div className="serviceDetails">
              <p>Dépose gel</p>
              <span>20 €</span>
            </div>
            <div className="serviceDetails">
              <p>Ongle cassé</p>
              <span>5 €</span>
            </div>
            <div className="serviceDetails">
              <p>Décoration / Strass </p>
              <span> À partir de 1 € /ongle</span>
            </div>
          </div>

          <div className="servicesBox">
            <h2>LES VERNIS</h2>

            <div className="serviceDetails">
              <p>Vernis semi-permanent french ou couleur avec manucure </p>
              <span>40 €</span>
            </div>
            <div className="serviceDetails">
              <p>Dépose vernis semi-permanent</p>
              <span>15 €</span>
            </div>
            <div className="serviceDetails">
              <p>Pose de vernis avec préparation de l’ongle</p>
              <span>15 €</span>
            </div>
          </div>

          <div className="servicesBox">
            <h2>LES SOINS</h2>

            <div className="serviceDetails">
              <p>Beauté des mains avec modelage relaxant </p>
              <span>25 €</span>
              <p>(avec vernis + 10 €)</p>
            </div>
            <div className="serviceDetails">
              <p>Soin des mains hydratation intense - 1 heure</p>
              <span>60 €</span>
              <p>(avec vernis + 10 €)</p>
            </div>
          </div>
        </section>

        <section className="servicesCategory">
          <h1>BEAUTÉ DES ONGLES // PIEDS</h1>

          <div className="servicesBox">
            <h2>LE GEL ET LE VERNIS</h2>

            <div className="serviceDetails">
              <p>Pose de gel french ou couleur</p>
              <span>40 €</span>
            </div>
            <div className="serviceDetails">
              <p>Pose de vernis</p>
              <span>15 €</span>
            </div>
            <div className="serviceDetails">
              <p>Ongle cassé</p>
              <span>5 €</span>
            </div>
            <div className="serviceDetails">
              <p>Décoration / Strass </p>
              <span> À partir de 1 € /ongle</span>
            </div>
          </div>

          <div className="servicesBox">
            <h2>LES SOINS</h2>

            <div className="serviceDetails">
              <p>Beauté des pieds avec modelage relaxant </p>
              <span>35 €</span>
              <p>(avec vernis + 8 €)</p>
            </div>
            <div className="serviceDetails">
              <p>Beauté des pieds hydratation intense - 1 heure</p>
              <span>60 €</span>
              <p>(avec vernis + 8 €)</p>
            </div>
            <div className="serviceDetails">
              <p>Soin Callus Peeling</p>
              <span>40 €</span>
            </div>
          </div>
          <div className='cartFid'>
          <p>« Carte de fidélité onglerie » : au bout du 4ème tampon, la prestation suivante à -10% (carte valable un an)</p>
          </div>
        </section>
      </div>
    );
  }
}
