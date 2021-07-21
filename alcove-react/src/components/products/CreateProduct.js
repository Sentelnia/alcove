import React from 'react';
// import { Link } from 'react-router-dom';
import productsService from './products-service';

class CreateProduct extends React.Component {
  state = {
    name: "",
    unitPrice: "",
    category: "BASIC",
    advice: "",
    ingredients: "",
    description:"",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    productsService.createProduct(this.state)
    .then((response)=>console.log('response:',response))
    .catch(err => console.log('error:',err))
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit} className='createProduct'>
          <label>
            category:
            <select name="category" value={this.state.category} onChange={e => this.handleChange(e)}>
              <option value="BASIC">BASIC</option>
              <option value="CARTE">CARTE</option>
              <option value="LASH">LASH</option>
              <option value="NAIL">NAIL</option>
            </select>
          </label>

          <label>Nom du produit:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />

          <img src="https://via.placeholder.com/375x250" alt="product-pic" />

          <label>Prix:</label>
          <input type="text" name="unitPrice" value={this.state.unitPrice} onChange={e => this.handleChange(e)} />

          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />

          <label>Conseil d'utilisation:</label>
          <textarea name="advice" value={this.state.advice} onChange={e => this.handleChange(e)} />

          <label>Ingrédients :</label>
          <textarea name="ingredients" value={this.state.ingredients} onChange={e => this.handleChange(e)} />
        </form>

        <button className="btn" onClick={this.handleSubmit}>Créer produit</button>
      </>
    )
  }
}

export default CreateProduct;