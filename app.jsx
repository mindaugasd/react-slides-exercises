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

var SelfDestructTimerComponent = React.createClass({
  getInitialState: function() {
    return {
      countdown: 42,
      intervalId: -1,
    }
  },

  componentWillMount: function() {
    this.setState({ intervalId: setInterval(this.countdown, 1000) });
  },

  componentWillUnmount: function() {
    clearInterval(this.state.intervalId);
  },

  countdown() {
    var currentCountdown = this.state.countdown
    if (this.state.countdown > 0) {
      this.setState({ countdown: currentCountdown - 1})
    }
  },

  render: function() {
    var style = {};
    if (this.state.countdown < 1) {
      style.background = 'red';
    }
    return (<div style={style}>{this.state.countdown}</div>);
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
      <SelfDestructTimerComponent />
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
