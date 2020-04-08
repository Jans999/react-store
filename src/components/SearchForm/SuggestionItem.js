import React, { Component } from 'react'
import styled from 'styled-components'

export default class SuggestionItem extends Component {


    render() {
        const {img, title, handleSuggestionSearch} = this.props;

        return (
            <ShirtItem onClick={() => handleSuggestionSearch(title)} className="form-control d-flex">
                <img className="img-fluid" alt={title} src={img} />
                <p className="text-muted">{title}</p>
                
            </ShirtItem>
        )
    }
}


const ShirtItem = styled.div`
    border: black solid 1px;
    cursor: pointer;
    height: 5em;
    max-width: 100%;
    /* margin: 0.03em; */
    width: 13.8em;
    &:hover{
        opacity: 0.6;
    }
    &>img{
        height: 3em;
        padding: 0.2em;
    }
`