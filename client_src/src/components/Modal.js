import React, { Component } from 'react'

export default class Modal extends Component {
	componentDidMount() {
		this.listenForEsc()
	}

	listenForEsc = () => {
		const { toggleModal } = this.props 
		window.addEventListener("keypress", (event) => {
			if (event.keyCode == 27 && this.props.isOpen) { toggleModal() }
		})
	}

	render() {
		const { styles = {}, header, body, isOpen, toggleModal } = this.props

		const defaultStyles = {
			position: "fixed",
			top: "45%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			transition: "visibility 5.5s, opacity 5.5s linear",
			width: "600px",
			height: "400px",
			backgroundColor: "red",
			maxWidth: "100%",
			maxHeight: "100%"
		}

		const displayStyles = Object.assign({}, defaultStyles, styles)
		const modalHead = header ? <h1>{header}</h1> : ""
		
		if (isOpen) {
			return (
				<div>
					<div style={displayStyles}>
					<div className="modalHeader">
						{modalHead}
					</div>
					<div className="modalBody">
						{body}
					</div>
					<button onClick={toggleModal}>Close</button>
					</div>
				</div>
			)
		} else {
			return ""
		}
	}
}