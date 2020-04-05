import React from 'react'

// import {withRouter} from 'react-router-dom'

import {ProductConsumer} from '../../context'


export default function SearchForm() {

    return (
        // <withRouter>
        <ProductConsumer>
        {value => {
        const {handleSearchSubmit, handleSearchChange, searchField} = value;
            return (     
            
                <form className="px-3" onSubmit={(event) => handleSearchSubmit(event)}>
                    <input type="text" value={searchField} onChange={(event) => handleSearchChange(event)} placeholder="Search"></input>
                </form>)
            }    
        }
        </ProductConsumer>
        // </withRouter>
    )
}
