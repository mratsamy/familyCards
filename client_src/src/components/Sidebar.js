import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'underscore'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggleDrawer = debounce((newState) => {
        this.setState({isOpen: newState})
    }, 250)

    render() {
        const {} = this.props
        // todo, 
        // create open & close buttons
        //figure out links, 
        //add css transitions for opening and closing bar

        if (!this.state.isOpen) {
            return (
                <div>

                </div>
            )
        }

        return (
            <div>
                <p>im a sidebar</p>
            </div>
        )
    }
}