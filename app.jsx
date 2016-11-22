console.log( 'Pasileido' )

//SELF DESTRUCT
var SelfDestructTimerComponent = React.createClass( {
    getInitialState: function() {
        return { count: 5 }
    },
    componentWillMount: function() {
        setInterval( this.timer, 1000 )
    },

    timer: function() {
        if ( this.state.count > 0 ) {
            this.setState( { count: this.state.count - 1 })
        }
    },

    render: function() {
        var countBackground;
        var isDestroyed = this.state.count <= 0
        if ( isDestroyed ) {
            countBackground = { color: 'red' }
        }
        return (
            <div style={countBackground}>
                Self destruct: {this.state.count}
            </div>
        );
    }
});
SelfDestructTimerComponent.propTypes = {
    // Properties JSON
};



var ProductAdministrationComponent = React.createClass( {
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
        console.log( 'Submitted', this.state );
        event.preventDefault();
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label><br />
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} /><br />
                <label>Image url:</label><br />
                <input type="text" value={this.state.image} onChange={this.handleImageChange} /><br />
                <label>Description:</label><br />
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} /><br />
                <label>Price:</label><br />
                <input type="number" step="any" value={this.state.price} onChange={this.handlePriceChange} /><br />
                <label>Qty.:</label><br />
                <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} /><br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
});

var styles = {
        thumbnail: {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            },
        image: {
            height: '200px', display: 'block'
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
                            <SelfDestructTimerComponent />
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
    return ( <div className="row">{productCards} <ProductAdministrationComponent /> </div>);
};

ProductListComponent.propTypes = {
    products: React.PropTypes.array.isRequired,
};

var myProducts = [
    {
        image: 'https://www.usa.canon.com/internet/wcm/connect/us/0265b57f-d9dd-46fc-b0c6-460b0ee67488/t6s_3q-675x450.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_P1KGHJ01L85180AUEPQQJ53034-0265b57f-d9dd-46fc-b0c6-460b0ee67488-l20WdTS',
        title: 'Canon 550D',
        price: 100
    },
    {
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ4C288aLyqFXAVm7kIXDQLCgEufb58wLK6NA5LdzbwW1MKCvBP',
        title: 'Canon 50D',
        price: 500
    },
    {
        image: 'https://shop.usa.canon.com/wcsstore/ExtendedSitesCatalogAssetStore/35706_1_xl.jpg',
        title: 'Canon 1D',
        price: 1500
    }



];

ReactDOM.render(
    <ProductListComponent products={myProducts} />,
    document.getElementById( 'root' )
);