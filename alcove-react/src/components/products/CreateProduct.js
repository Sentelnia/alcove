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
    description: "",
    imageUrl: ""
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    productsService.createProduct(this.state)
      .then(() => {
        this.props.history.push('/')
        console.log('produit créé')
      })
      .catch(err => console.log('error:', err))
  }

  handleUpload = (event) => {

    let formData = new FormData();
    formData.append('imageUrl', event.target.files[0]);

    productsService.upload(formData)
      .then(response => {
        this.setState({ imageUrl: response.secure_url });
      })
      ;
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

          <label>
            <img className="product-pict" alt="product-pict" src={this.state.imageUrl || "https://via.placeholder.com/375x250"} />
            <input type="file" name="image" onChange={this.handleUpload} />
          </label>

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