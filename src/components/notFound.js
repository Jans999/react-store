import React, { Component } from 'react'

export default class notFound extends Component {

    componentWillUnmount() {
        this.props.handleNotFoundflag()
    }

    render() {
        return (
            <div>
                <h2>Sorry that shirt was not found</h2>
            </div>
        )
    }

 
}
