var PropTypes = window.React.PropTypes;

var ProductAdministrationComponent = function( props ) {
    return (
        <form>
            <h3>Add new item</h3>
            <label>Name:</label><br />
            <input className="form-control" type="text" value={props.title} onChange={props.onTitleChange} /><br />
            <label>Image url:</label><br />
            <input className="form-control" type="text" value={props.image} onChange={props.onImageChange} /><br />
            <label>Description:</label><br />
            <input className="form-control" type="text" value={props.description} onChange={props.onDescriptionChange} /><br />
            <label>Price:</label><br />
            <input className="form-control" type="number" step="any" value={props.price} onChange={props.onPriceChange} /><br />
            <label>Qty.:</label><br />
            <input className="form-control" type="number" value={props.quantity} onChange={props.onQuantityChange} /><br />
            <button className="btn btn-success" style={{ marginRight: '20px' }} onClick={props.handleSubmit}>Save</button>
        </form>


    );
};

ProductAdministrationComponent.propTypes = {
        title: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        quantity: React.PropTypes.number.isRequired,

        onTitleChange: React.PropTypes.func.isRequired,
        onImageChange: React.PropTypes.func.isRequired,
        onDescriptionChange: React.PropTypes.func.isRequired,
        onPriceChange: React.PropTypes.func.isRequired,
        onQuantityChange: React.PropTypes.func.isRequired
};

var ProductAdministrationContainer = React.createClass({
                    getInitialState: function() {
        return {
                    title: 'default',
            image: 'default',
            description: 'default',
            price: 0,
            quantity: 0
        };
    },

    handleTitleChange: function( event ) {
                    this.setState( { title: event.target.value });
                },

    handleImageChange: function( event ) {
                    this.setState( { image: event.target.value });
                },

    handleDescriptionChange: function( event ) {
                    this.setState( { description: event.target.value });
                },

    handlePriceChange: function( event ) {
                    this.setState( { price: event.target.value });
                },

    handleQuantityChange: function( event ) {
                    this.setState( { quantity: event.target.value });
                },

    handleSubmit: function( event ) {
        var self = this;
        axios.post('https://itakademija.herokuapp.com/api/products', {
                    title: this.state.title,
                    image: this.state.image,
                    description: this.state.description,
                    price: this.state.price,
                    quantity: this.state.quantity
        })
        .then(function (response) {
                    console.log( response );
                })
        .catch(function (error) {
                    console.log( error );
                });
        
        event.preventDefault();
    },

    render: function() {   
        return (
        <ProductAdministrationComponent
                    title={this.state.title}
                    image={this.state.image}
                    description={this.state.description}
                    price={this.state.price}
                    quantity={this.state.quantity}
                    onTitleChange={this.handleTitleChange}
                    onImageChange={this.handleImageChange}
                    onDescriptionChange={this.handleDescriptionChange}
                    onPriceChange={this.handlePriceChange}
                    onQuantityChange={this.handleQuantityChange}
                    />
                )
    }
});



var styles = {
            thumbnail: {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            },
            image: {
            height: '200px', 
            display: 'block'
            }
}

var ProductCardComponent = React.createClass( {
    render: function() {
        return (
                <div className="col-sm-6 col-md-4">
                    <div className="thumbnail" style={styles.thumbnail}>
                        <img src={this.props.image} alt="image" style={styles.image} />
                        <div className="caption">
                            <h3>{this.props.title}</h3>
                            <p>${this.props.price}</p>
                            <p><a href="#" className="btn btn-primary" role="button">Buy</a></p>
                        </div>
                    </div>
                </div>
                );
    }
});

ProductCardComponent.propTypes = {
                    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
};


var ProductListComponent = function( props ) {
    var productCards = props.products.map( function( product, index ) {
        return (
            <ProductCardComponent
                    key={index}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    />
                );
    });
    return ( <div className="row">{productCards} </div>);
};

var ProductListContainer = React.createClass({
                    getInitialState: function() {
        return {
                    products: []

        };
    },

    componentWillMount: function() {
        var self = this;
        axios.get('https://itakademija.herokuapp.com/api/products')
        .then(function (response) {
                    self.setState( { products: response.data });
                })
        .catch(function (error) {
                    console.log( error );
                })
    },
    render: function() {
        return <ProductListComponent products={this.state.products} />
                }
});

ProductListComponent.propTypes = {
                    products: React.PropTypes.array.isRequired,
};


var App = function(props) {
    return <div>{props.children}</div>;
};

var NoMatch = function(props) {
    return <div>Route did not match</div>;
};

var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var IndexRoute = window.ReactRouter.IndexRoute;

ReactDOM.render((
        <Router history={window.ReactRouter.hashHistory}>
                    <Route path="/" component={App}>
                        <Route path="/products" component={ProductListContainer} />
                        <Route path="/admin/products/new" component={ProductAdministrationContainer} />
                        <Route path="/admin/products/:id" component={ProductAdministrationContainer} />
                        <Route path="*" component={NoMatch} />
                    </Route>
                </Router>
), document.getElementById('root'));