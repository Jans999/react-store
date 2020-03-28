import React from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'
import styled from 'styled-components'

export default function Details() {
    return (
        <ProductConsumer>
            {(value) => {
                const {id, company, img, info, price, title, shirtSize} = value.detailsProduct;
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
                                <h4 className="text-center pt-5">Sizing Guide</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Small</th>
                                        <th scope="col">Medium</th>
                                        <th scope="col">Large</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">Up to 15" chest</td>
                                            <td>15.5"-16.5" chest</td>
                                            <td>16.5" chest and above </td>
                                        </tr>
                                    </tbody>
                                    </table>
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
                                    disabled={shirtSize.find(size => size === "small") ? true:false}
                                    onClick={ ()=>{
                                        value.addToCart(id, 'small')
                                        value.openModal(id)                    
                                    }}
                                    >
                                           {shirtSize.find(size => size === "small")? <Sizes><span>In Cart</span></Sizes>:
                                           <Sizes><span>Small</span></Sizes>}
                                    </ButtonContainer>

                                    <ButtonContainer
                                    cart
                                    disabled={shirtSize.find(size => size === "medium") ? true:false}
                                    onClick={ ()=>{
                                        value.addToCart(id, 'medium')
                                        value.openModal(id)                    
                                    }}
                                    >
                                           {shirtSize.find(size => size === "medium")? <Sizes><span>In Cart</span></Sizes>:
                                           <Sizes><span>Medium</span></Sizes>}
                                    </ButtonContainer>

                                    <ButtonContainer
                                    cart
                                    disabled={shirtSize.find(size => size === "large") ? true:false}
                                    onClick={ ()=>{
                                        value.addToCart(id, 'large')
                                        value.openModal(id)                    
                                    }}
                                    >
                                           {shirtSize.find(size => size === "large")? <Sizes><span>In Cart</span></Sizes>:
                                           <Sizes><span>Large</span></Sizes>}
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

const Sizes = styled.div `
        .size-button:hover{
        color: var(--mainBlue);
        cursor: pointer;
    }
`
