import React from 'react';
// import { Link } from 'react-router-dom';
import productsService from './products-service';

class EditProduct extends React.Component {
  state = {
    name: "",
    unitPrice: "",
    category: "BASIC",
    advice: "",
    ingredients: "",
    description: "",
    imageUrl: ""
  };

  componentDidMount() {
    productsService.getProduct(this.props.match.params.id)
      .then(response => this.setState(response))
      .catch(err => {
        console.log(err)
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    productsService.updateProduct(this.state, this.props.match.params.id)
      .then(() => {
        this.props.history.push('/')
        console.log('produit modifié')
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
        <form onSubmit={this.handleSubmit} className='createProduct'>
          <label>
            category:
            <select name="category" value={this.state.category} onChange={e => this.handleChange(e)}>
              <option value="BASIC">BASIC</option>
              <option value="CARTE">CARTE</option>
              <option value="LASH">LASH</option>
              <option value="NAIL">NAIL</option>
            </select>
          </label>

          <label>Nom du produit:
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
          </label>
          
          <label>
            <img className="product-pict" alt="product-pict" src={this.state.imageUrl || "https://via.placeholder.com/375x250"} />
            <input type="file" name="image" onChange={this.handleUpload} />
          </label>

          <label>Prix:
          <input type="text" name="unitPrice" value={this.state.unitPrice} onChange={e => this.handleChange(e)} />
          </label>

          <label>Description:
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          </label>

          <label>Conseil d'utilisation:
          <textarea name="advice" value={this.state.advice} onChange={e => this.handleChange(e)} />
          </label>

          <label>Ingrédients :
          <textarea name="ingredients" value={this.state.ingredients} onChange={e => this.handleChange(e)} />
          </label>

          <button className="btn">Enregistrer</button>
        </form>
      </>
    )
  }
}

export default EditProduct;