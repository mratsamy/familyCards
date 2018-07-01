import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Logout from './Logout'
import Modal from './Modal'
import { toggleSidebar } from '../redux/modules/sidebar'
const uuid = require('uuid/v4')

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = { isModalOpen: false }
    }

    toggleModal = () => {
        console.log(this.state)
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    getLinks() {
        const { isAdmin } = this.props
        const links = [{to:'/', text:"Home"}, {to:"/profile", text:"Profile"}]

        if (isAdmin) {
            links.push({to:"/newScore", text:"New Score"})
            links.push({to:"/admin", text:"Admin"})
        }

        return links
    }

    createModal = () => {
        return (
            <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal} />
        )
    }

    render() {
        const { toggleSidebar, isOpen, isAdmin } = this.props
        const links = isOpen ? this.getLinks() : []

        const styles = {
            width:"35vh",
            top: 0,
            bottom: 0,
            left: 0, 
            minHeight: "100vh", 
            backgroundColor: "teal", 
            zIndex: 1,
            position: "fixed"
        }

        if (isOpen) {
            return (
                <div style={styles}>
                <a onClick={toggleSidebar}>close</a>
                {this.createModal()}
                    {this.getLinks().map(item => {
                        const {to, text} = item
                        return <div key={uuid()}><Link to={to}>{text}</Link></div>
                    })}
                    {(isAdmin) ? <div><a onClick={this.toggleModal}>hi</a></div> : ""}
                    <Logout />
                </div>
            )
        } else {
            return (
                <div>
                    <a onClick={toggleSidebar}>open</a>
                </div>
            )
        }
        // todo, 
        // create open & close buttons
        //figure out links, 
        //add css transitions for opening and closing bar
    }
}

const mapStateToProps = state => ({
    isOpen: state.sidebar.isOpen,
    isAdmin: state.user.isAdmin
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSidebar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)