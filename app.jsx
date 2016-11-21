var PropTypes = window.React.PropTypes;
var React = window.React;

var styles = {
  thumbnail: {
    maxWidth: '242px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  image: { width: '100%', height: '200px', display: 'block'}
};

var ProductCardComponent = React.createClass({
  render: function() {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail" style={styles.thumbnail}>
          <img src={this.props.image} style={styles.image} alt="..."/>
          <div className="caption">
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
            <p>{this.props.price} Eur</p>
            <p><button className="btn btn-primary" role="button">Details</button></p>
          </div>
        </div>
      </div>
    );
  }
});

ProductCardComponent.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

var ProductAdministrationComponent = React.createClass({
  getInitialState: function() {
    return {
      image: '',
      title: '',
      description: '',
      price: 0,
      quantity: 0,
    };
  },

  handleSaveClick: function(e) {
    console.log(this.state);
    e.preventDefault();
  },

  onTitleChange: function(e) {
    this.setState({ title: e.target.value });
  },

  onImageChange: function(e) {
    this.setState({ image: e.target.value });
  },

  onDescriptionChange: function(e) {
    this.setState({ description: e.target.value });
  },

  onPriceChange: function(e) {
    this.setState({ price: e.target.value });
  },

  onQuantityChange: function(e) {
    this.setState({ quantity: e.target.value });
  },

  render: function() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" value={this.state.title} onChange={this.onTitleChange} />
          </div>
          <div className="form-group">
            <label>Image url</label>
            <input className="form-control" value={this.state.image} onChange={this.onImageChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input className="form-control" value={this.state.price} onChange={this.onPriceChange} />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              className="form-control"
              value={this.state.quantity}
              onChange={this.onQuantityChange}
            />
          </div>

          <button className="btn btn-success" style={{ marginRight: '20px' }} onClick={this.handleSaveClick}>Save</button>
        </form>
      </div>
    );
  }
});

var ProductListComponent = function(props) {
  var productCards = props.products.map(function (product, index) {
    return (
      <ProductCardComponent
        key={index}
        id={product.id}
        image={product.image}
        title={product.title}
        description={product.description}
        price={product.price}
      />
    );
  });
  return (
    <div className="row">
      <ProductAdministrationComponent />
      {productCards}</div>
    );
};

ProductListComponent.propTypes = {
  products: React.PropTypes.array.isRequired,
};

var testProducts = [
  {
    id: 1,
    image: 'samsung.jpg',
    title: 'Telephons',
    description: 'Fainas',
    price:2.5
  },
  {
    id: 2,
    image: 'samsung.jpg',
    title: 'Telephons 2',
    description: 'Fainas',
    price:2.7
  },
  {
    id: 3,
    image: 'samsung.jpg',
    title: 'Telephons 3',
    description: 'Fainas',
    price:2.8
  }
];

ReactDOM.render(<ProductListComponent products={testProducts} />, document.getElementById('root'))
