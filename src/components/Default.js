import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Default extends Component {

    // Changed to class component and it broke the props


    render() {
        const url = this.props.props.location.pathname
        const searching = this.props.searching;

        // {this.props.searching? <Redirect to="/details" />:  }
        if (searching) {
            return <Redirect to='/details' />;
        } 

        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-4">404</h1>
                        <h1>Error</h1>
                        <h2>Page not found</h2>
                        <h3>The requested URL <span className="text-danger">{url}</span> was not found</h3>
                    </div>
                </div>
            </div>
        )
    }
  
}
