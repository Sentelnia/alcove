import React from 'react';
import { Link } from 'react-router-dom';

class ConfirmedOrder extends React.Component {
  render() {
    return (
      <div className='confirm'>
        <h3>MERCI</h3>
        <p>Votre commande n° {this.props.location.state.orderNumber} a bien été prise en compte. Vous pouvez suivre son avancement dans "Mon profil", rubrique "Mes achats". Un E-mail de confirmation vous a également été envoyé.</p>

        <div className='confirmLink'>
        <Link to='/'>Accueil</Link>
        <Link to='/profile'>Mon profile</Link>
        </div>
      </div>
    )
  }
}

export default ConfirmedOrder;