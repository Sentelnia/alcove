import React from 'react';
import { Link } from 'react-router-dom';

class CreateProduct extends React.Component {
  render() {
    return (
      <>
       <form onSubmit={this.handleFormSubmit} className='createProduct'>
          <label>Nom du produit:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />

          <img src="https://via.placeholder.com/400x250" alt="product-pic" />

          <label>Prix</label>
          <input name="price" value={this.state.price} onChange={e => this.handleChange(e)} />
        </form>

        <button className="btn" onClick={this.handleSubmit}>Créer produit</button>
      </>
    )
  }
}

export default CreateProduct;