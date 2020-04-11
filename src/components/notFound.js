import React, { Component } from 'react'

export default class notFound extends Component {

    componentWillUnmount() {
        this.props.handleNotFoundflag()
    }

    render() {
        return (
            <div className="text-center m-auto pt-5">
                <h2>Sorry that shirt was not found</h2>
            </div>
        )
    }

 
}
