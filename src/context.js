import React, { Component } from 'react'
import { storeProducts, detailProduct} from './data'

// Bridging tasks
// Cartproduct is an object that needs to be accessed when it's mapped
// When the array is repoluated it's a solid array of the items, not an array of cartitems. Need to update how it's accessed across
// The other areas so that the cart works with removing items.

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            products: [],
            detailsProduct: detailProduct,
            cart: [],
            modalOpen: false,
            modalProduct: detailProduct,
            cartSubTotal: 0,
            cartTax: 0,
            cartTotal: 0,
            searchField: '',
            searching: false,
            notFound: false,
            suggestions: [],
            suggestionsActive: false,
        }
    }

    componentDidMount(){
        this.setProducts();
    }

    setProducts = () => {
        // Makes a copy of the data and sets the state products to this
        // Also updates the detailsProduct to the current state of SmallMedLarge in the products

        const productList = JSON.parse(JSON.stringify(storeProducts));
        this.setState({products: productList, detailsProduct: productList[0]})

        // let tempProducts = [];
        // storeProducts.forEach(item => {
        //     const singleItem = {...item};
        //     tempProducts = [...tempProducts, singleItem]
        // })
        // this.setState(()=>{
        //     return {products: tempProducts}
        // })
    }

    getItem = (id) => {
        const product = this.state.products.find((item) => item.id == id)
        return product;
    }
    
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState({detailsProduct: product})    
    }

    // Called in product component
    // Creates a copy of the current items, updates the details on the product selected 
    // adds to the size cart array, incrementing the count
    // Then sets the copy to the state product array (overwrites)
    // Adds the totals up

    addToCart = (id, size) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];

        // Make a copy of the product for the cart
        const cartProduct = JSON.parse(JSON.stringify(product));

        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price; 
        product.shirtSize.push(size); 

        cartProduct.inCart = true;
        cartProduct.count = 1;
        cartProduct.total = price;
        cartProduct.shirtSize = size;
        cartProduct.id = `${id}${size}`;

       
        this.setState(
            () => {
            return {cart: [ ...this.state.cart, {cartProduct}], products: tempProducts};},
            () => {
            this.addTotals();
             });
    };

    getSize = (id, size) => {
        console.log("get size method")
    }

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen: true};
        })
    }

    closeModal = () => {
        this.setState( () => {
        return {modalOpen: false} })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => (item.cartProduct.id === id) );
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.cartProduct.count = product.cartProduct.count + 1;
        product.cartProduct.total = product.cartProduct.count * product.cartProduct.price;
        
        this.setState(() => {
            return {cart: [...tempCart]}
        }, () => {
            this.addTotals();
        })

    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.cartProduct.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.cartProduct.count --;
        if (product.cartProduct.count === 0) {
            this.removeItem(id);
        } else {
            product.cartProduct.total = product.cartProduct.count * product.cartProduct.price;
            this.setState(() => {
                return {cart: [...tempCart]}
            }, () => {
                this.addTotals();
            })
        }

    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [];
        this.state.cart.forEach(item => tempCart.push(item));

        // Taking the item out of the cart
        tempCart = tempCart.filter(item => item.cartProduct.id !== id);

        // Turning the size id back to product id
        let re = /a-z/;
        let productId = id[0].split(re)[0];
        let size = id.slice(1);

        const index = tempProducts.indexOf(this.getItem(productId));

        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        let sizesLeft = removedProduct.shirtSize.filter(item => item !== size );
        removedProduct.shirtSize = sizesLeft;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        } )

    }

    clearCart = () => {
        this.setState(() => {
            return {cart: []}
        }, () => {
            this.setProducts();
            this.addTotals();
        } )
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => {subTotal += item.cartProduct.total});
        const tempTax = subTotal * 0.175;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return{
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    // Search functions

    closeAutoFill = (search) => {
        // this.handleSuggestionSearch(search)
        this.setState({suggestionsActive: false})
    }

    openAutoFill = () => {
        this.setState({suggestionsActive: true})
    }

    searchFunction = () => {
        let itemList = [...this.state.products];
        for (var i = 0; i < itemList.length; i ++) {
            if (itemList[i].title.toLowerCase() == this.state.searchField.toLowerCase()) {
                return this.setState({detailsProduct: itemList[i], notFound: false})
            }
    }}

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.setState({notFound: true, searching: true}, this.searchFunction)
        this.closeAutoFill();
    }

    handleSuggestionSearch = (search) => {
        // Create a copy of the product list
        // Set flags to search and set the searchField to be the item searched
        console.log("firing")
        this.setState({notFound: true, searching: true, searchField: search}, this.searchFunction)
        // If the item title matches the searchfield, sets that product as the detailproduct
    }




    autofill = () => {
        // Creates an array of suggestions
        this.setState({suggestions: []}, () => this.state.products.map(item => {
            // Searches for any product with the searchfield in the title
            const searchQuery = new RegExp(this.state.searchField.toLowerCase());
            if (this.state.suggestionsActive) {
                // If it matches, then adds it to the suggestions array
                if (item.title.toLowerCase().match(searchQuery)){
                    this.setState({...this.state.suggestions.push(item)})
                } 
            }
        }))
    }


    handleSearchChange = (e) => {
        this.setState({searchField: e.target.value}, this.autofill);
    }

    handleSearchingFlag = () => {
        this.setState({searching: false});
    }
    
    handleNotFoundFlag = () => {
        this.setState({notFound: false})
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                getSize: this.getSize,
                handleSearchSubmit: this.handleSearchSubmit,
                handleSearchChange: this.handleSearchChange,
                handleSearchingFlag: this.handleSearchingFlag,
                handleNotFoundFlag: this.handleNotFoundFlag,
                handleSuggestionSearch: this.handleSuggestionSearch,
                closeAutoFill: this.closeAutoFill,
                openAutoFill: this.openAutoFill
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}
