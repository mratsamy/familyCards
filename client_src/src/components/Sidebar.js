import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Logout from './Logout'
import { toggleSidebar } from '../redux/modules/sidebar'

class Sidebar extends Component {
    getLinks() {
        const { isAdmin } = this.props
        const links = [{to:'/', text:"Home"}, {to:"/profile", text:"Profile"}]

        if (isAdmin) {
            links.push({to:"/newScore", text:"New Score"})
            links.push({to:"/admin", text:"Admin"})
        }

        return links
    }

    render() {
        const { toggleSidebar, isOpen } = this.props
        const links = isOpen ? this.getLinks() : []

        if (!isOpen) {
            return (
                <div>
                    {this.getLinks().map(item => {
                        const {to, text} = item
                        return <div><Link to={to}>{text}</Link></div>
                    })}
                    <Logout />
                </div>
            )
        } else {
            return (
                <div>
                    <p>test1</p>
                </div>
            )
        }
        // todo, 
        // create open & close buttons
        //figure out links, 
        //add css transitions for opening and closing bar
        return (
            <div>
                <button onClick={toggleSidebar}>
                    {isOpen ? "Open" : "Close"}
                </button>
                { 
                    links.map(thisLink => {
                        return (<div><Link to={thisLink.to}>{thisLink.text}</Link></div>)
                    })
                }
            </div>
        )
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