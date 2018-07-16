import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, DialogContent, Dialog, DialogTitle, Slide } from '@material-ui/core' 
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { closeModal } from '../redux/modules/modal'

const styles = theme => ({})

class ControlledModal extends Component {
	render() {
		const { title, body, isOpen, closeModal, isFetching, modalDispatchReset=false } = this.props
		return (
			<Dialog
				fullWidth
				aria-labelledby="modal-title"
				transitionComponent={(props) => <Slide direction="up" {...props} />}
				aria-describedby="modal-description"
				open={isOpen}
				onBackdropClick={() => closeModal(modalDispatchReset)}
				onClose={() => closeModal(modalDispatchReset)}>
					<DialogTitle id="dialog-title">
						{title}&nbsp;&nbsp;
						{(isFetching) ? <FontAwesomeIcon icon="cog" spin /> : ""}
					</DialogTitle>
					<DialogContent>
					{body}
					</DialogContent>
			</Dialog>
		)
	}
}

ControlledModal.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	isOpen: state.modal.isOpen,
	title: state.modal.title,
	body: state.modal.body,
	modalDispatchReset: state.modal.modalDispatchReset
})

const mapDispatchToProps = dispatch => bindActionCreators({
	closeModal
}, dispatch)

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(ControlledModal)