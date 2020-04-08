import React, { Component } from 'react'
import styled from 'styled-components'
import SuggestionItem from './SuggestionItem'
import {ProductConsumer} from '../../context'

// bridging tasks
// Begin building suggestions populating array function


export default class Suggestion extends Component {
    render() {
        return (

            <ProductConsumer>
            {value => {
                const suggestionsArray = value.suggestions;
                const handleSuggestionSearch = value.handleSuggestionSearch
                return(
                    <SuggestionContainer>
                        {suggestionsArray.map(item =>
                             <SuggestionItem img={item.img} key={item.id} title={item.title} handleSuggestionSearch={handleSuggestionSearch} />
                        )}
                        {/* <SuggestionItem img={img} title={title} />
                        <SuggestionItem img={img} title={title} />
                        <SuggestionItem img={img} title={title} />
                        <SuggestionItem img={img} title={title} /> */}

                    </SuggestionContainer>
                )

            }}
            </ProductConsumer> 

        )
    }
}

const SuggestionContainer = styled.div`
    background: #fff;
    /* border: black solid 1px; */
    display: flex !important;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    top: 2.5em;
    right: 2em;
    text-align: center;
    z-index: 1000;
    /* max-width: 100%; */
`

// const SuggestionItem = styled.div`
//     border: black solid 1px;
//     cursor: pointer;
//     max-width: 100%;
//     /* margin: 0.03em; */
//     width: 13.8em;
//     &:hover{
//         opacity: 0.6;
//     }
// `