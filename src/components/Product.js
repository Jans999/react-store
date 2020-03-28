import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types'

export default function Product({product}) {
    return (
        <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
            <div className="card">

            <ProductConsumer>
                { (value) => (  
                <div className="img-container p-5" onClick={ () => value.handleDetail(product.id) }>
                <Link to="/details">
                    <img src={product.img} alt="product image" className="card-img-top" />
                </Link>
                <div className="cart-btn" >

                {/* checks if the size is in the size in cart and changes the button conditionally */}

                    {product.shirtSize.find( item => item === 'small')?(<SizeButton className="text-capitalize mb-0" disabled>In cart</SizeButton>)
                        :(<SizeButton className="size-button" onClick={() => {
                            value.addToCart(product.id, 'small')
                            value.openModal(product.id)                    
                    }}>
                    Small</SizeButton>)}
                    
                    {product.shirtSize.find( item => item === 'medium')?(<SizeButton className="text-capitalize mb-0" disabled>In cart</SizeButton>)
                        :(<SizeButton className="size-button" onClick={() => {
                            value.addToCart(product.id, 'medium')
                            value.openModal(product.id)                    
                    }}>
                    Medium</SizeButton>)}

                    {product.shirtSize.find( item => item === 'large')?(<SizeButton className="text-capitalize mb-0" disabled>In cart</SizeButton>)
                        :(<SizeButton className="size-button" onClick={() => {
                            value.addToCart(product.id, 'large')
                            value.openModal(product.id)                    
                    }}>
                    Large</SizeButton>)}


                </div>
               </div> )}
 
            </ProductConsumer>

               {/* Card Footer */}
               <div className="card-footer d-flex justify-content-between">
                   <p className="align-self-center mb-0">
                       {product.title}
                   </p>
                   <h5 className="text-blue font-italic mb-0">
                       <span className="mb-1">£{product.price}</span>
                   </h5>
               </div>
            </div>
        </ProductWrapper>
    )
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}

const ProductWrapper = styled.div`
    .card{
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer{
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover{
        .card{
            border: 0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer{
            background: rgba(247,247,247);
        }
    }
    .img-container{
        position: relative;
        overflow: hidden;
    }
    .img-container:hover 
    .card-img-top{
        transition: all 0.2s linear;  
        transform: scale(1.1);
    }
    .cart-btn{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
    }
    .img-container:hover .cart-btn{
        transform: translate(0,0);
        ${'' /* transition: all 0.2s linear;   */}
    }
    .size-button {
    }
    .size-button:hover{

    }
`;

const SizeButton = styled.button`
    background: var(--lightBlue);
    border: none;
    &:hover {
        color: var(--mainWhite);
        cursor: pointer;
    }
`