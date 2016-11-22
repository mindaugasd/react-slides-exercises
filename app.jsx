console.log( 'Pasileido' )

var ProductCardComponent = React.createClass( {
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <div className="thumbnail">
                            <img src={this.props.url} alt="..." />
                            <div className="caption">
                                <h3>{this.props.title}</h3>
                                <p>{this.props.price}</p>
                                <p><a href="#" className="btn btn-primary" role="button">Buy</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
ProductCardComponent.propTypes = {
    title: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
};

//SELF DESTRUCT

var SelfDestructTimerComponent = React.createClass( {
    getInitialState: function() {
        return { count: 5 }
    },
    componentWillMount: function() {
        setInterval( this.timer, 1000 )
    },

    /*    componentWillUnmount: function() {
            clearInterval( this.state.intervalId );
        },*/

    timer: function() {
        if ( this.state.count > 0 ) {
            this.setState( { count: this.state.count - 1 })
        }
    },

    render: function() {
        var countBackground;
        var isDestroyed = this.state.count <= 0
        if ( isDestroyed ) {
            countBackground = { background: 'red' }
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
            price: 'default',
            quantity: 0
        };
    },

    handleTitleChange: function( event ) {
        this.setState({title: event.target.value});
    },

    handleImageChange: function( event ) {
        this.setState({image: event.target.value});
    },

    handleDescriptionChange: function( event ) {
        this.setState({description: event.target.value});
    },

    handlePriceChange: function( event ) {
        this.setState({price: event.target.value});
    },

    handleQuantityChange: function( event ) {
        this.setState({quantity: event.target.value});
    },

    handleSubmit: function( event ) {
        console.log( 'Submitted', this.state );
        event.preventDefault();
    },
    
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} /><br />
                <label>Image url:</label>
                <input type="text" value={this.state.image} onChange={this.handleImageChange} /><br />
                <label>Description:</label>
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} /><br />
                <label>Price:</label>
                <input type="text" value={this.state.price} onChange={this.handlePriceChange} /><br />
                <label>Qty.:</label>
                <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} /><br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
});





var ProductListComponent = React.createClass( {
    render: function() {
        //var productsHtml = this.props.products.map(function (p,idx))

        return (
            <div>
                <p>Products list</p>

                <ProductCardComponent title="Canon 5D" price={666} url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Canon_EOS_5D.jpg/300px-Canon_EOS_5D.jpg" />
                <ProductCardComponent title="Canon 550D" price={111} />
                <ProductCardComponent title="Canon 1D" price={333} />

                <SelfDestructTimerComponent />


            </div>
        );
    }
});
ProductListComponent.propTypes = {

};

var myProducts = [];

ReactDOM.render(
    <ProductAdministrationComponent />,
    document.getElementById( 'root' )
);