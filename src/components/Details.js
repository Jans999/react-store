import React from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

export default function Details() {
    return (
        <ProductConsumer>
            {(value) => {
                const {id, company, img, info, price, title, inCart} = value.detailsProduct;
                return (
                    <div className="container py-5">
                        {/* Title */}
                        <div className="row">
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                <h1>{title}</h1>
                            </div>
                        </div>
                        {/* End of Title */}
                        {/* Product info */}
                        <div className="row">
                            <div className="col-10 mx-auto col-md-6 my-3">
                                <img src={img} className="img-fluid" alt="product" />   
                            </div>
                            {/* Product text */}
                            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <h2>Model: {title}</h2>
                                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    Made by: <span className="text-uppercase">{company}</span>
                                </h4>
                                <h4 className="text-blue"><strong>Price: <span>£</span>{price}</strong></h4>
                                <p className="text-capitilize font-weight-bold mt-3 mb-0">
                                    Some info about the product
                                </p>
                                <p className="text-muted lead">
                                    {info}
                                </p>
                                {/* Buttons */}
                                <div>
                                    <Link to="/">
                                        <ButtonContainer>Back to Products</ButtonContainer>
                                    </Link>
                                    <ButtonContainer
                                    cart
                                    disabled={inCart? true:false}
                                    onClick={ ()=>{
                                        value.addToCart(id)
                                        value.openModal(id)                    
                                    }}
                                    >
                                        {inCart? 'in Cart':'Add to Cart'}
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </ProductConsumer>
    )
}
