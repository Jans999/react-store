import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../../context'
import CartList from './CartList'
import CartTotals from './CartTotals'

import {Redirect} from 'react-router-dom'

export default class Cart extends Component {


    render() {
        return (
            
            <section>
            {this.props.searching? <Redirect to="/details" />: null}

                <ProductConsumer>
                    {value => {
                        const {cart} = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="Your" title="cart" />
                                    <CartColumns />
                                    <CartList value={value} />
                                    <CartTotals value={value}  />
                                </React.Fragment>
                            );} else {
                                return (
                                    <EmptyCart />
                                );
                            }
                        }
                    }
                </ProductConsumer>
    
            </section>
        )
    }

   
}
