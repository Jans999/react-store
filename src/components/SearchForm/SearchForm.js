import React from 'react'

import {ProductConsumer} from '../../context'
import Suggestion from './Suggestion';


export default function SearchForm() {

    return (
        <ProductConsumer>
        {value => {
        const {handleSearchSubmit, handleSearchChange, searchField, openAutoFill, closeAutoFill} = value;
    
            return (     
           
                <form className="px-3 mw-100 position-relative d-flex fex-column" onFocus={() => openAutoFill()} onMouseDown={() => openAutoFill()} onBlur={() => closeAutoFill(searchField)} onSubmit={(event) => handleSearchSubmit(event)}>
                    <div className="form-group form-check-inline form-check-label">
                        {/* <label htmlFor="search" className="text-white p-1 align-bottom">Search</label> */}
                        <input id="search" className="form-control form-check-input" type="text" value={searchField} onChange={(event) => handleSearchChange(event)} placeholder="Enter your search here"></input>
                    </div>
                    <div className="form-group mw-100">
                        <Suggestion className="form-control mw-100" />
                    </div>
                </form>)
            }    
        }
        </ProductConsumer>
    )
}
