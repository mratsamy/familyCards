import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles, Grid, TextField, FormControl, Button, Select, MenuItem, InputLabel, InputAdornment } from '@material-ui/core'
import  { compose } from 'recompose'

import { closeModal } from '../redux/modules/modal'
import { addGame } from '../redux/modules/games'
import { loadState } from '../redux/modules/user'

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		textAlign: "center"
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 200,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
	button: {
		margin: theme.spacing.unit,
	},
})

class NewScore extends Component {
	constructor(props) {
		super(props)
		this.state = {
			winner: "",
			numPlayers: "",
			buyInAmount: "",
		}
	}

	componentDidMount() {
		const { players, loadState } = this.props

		if (!players.length) { loadState() }
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}

	sendData = () => {
		const { addGame } = this.props
		
		addGame({
			userId: this.state.winner,
			numPlayers: this.state.numPlayers,
			winnings: this.state.buyInAmount * this.state.numPlayers
		})
	}

	render() {
		const { players, classes, closeModal, message, error } = this.props
		const color = (error) ? "#ffdddd" : "#ddffdd"

		return (
			<div className={classes.root}>
				<Grid container justify="center" direction="row">
					{
						(message && message.length) ? 
						<Grid item xs={12} style={{backgroundColor: color}}>
							<p>{message}</p>
						</Grid> : ""
					}
					<FormControl className={classes.formControl}>
						<Grid style={{paddingBottom: "5px"}} item xs={12}>
							<InputLabel htmlFor="winner">Winner</InputLabel>
							<Select 
								style={{minWidth: "100%"}}
								value={this.state.winner}
								onChange={this.handleChange}
								inputProps={{
									name: "winner",
									id: "winner"}}>
								<MenuItem value=""><em>None</em></MenuItem>
								{players.map(({firstName, lastName, id}) => {
									return <MenuItem key={id} value={id}>{`${firstName} ${lastName}`}</MenuItem>
								})}
							</Select>
						</Grid>
						<Grid style={{paddingBottom: "5px"}} item xs={12}>
							<TextField
								style={{minWidth: "100%"}}
								label="Number of Players"
								id="numPlayers"
								name="numPlayers"
								value={this.state.numPlayer}
								onChange={this.handleChange}
								InputProps={{
									startAdornment: (<InputAdornment position="start">#</InputAdornment>)
								}}
								 />
						</Grid>
						<Grid style={{paddingBottom: "5px"}} item xs={12}>
							<TextField 
								style={{minWidth: "100%"}}
								label="Buy In Amount"
								id="buyInAmount"
								name="buyInAmount"
								value={this.state.buyInAmount}
								onChange={this.handleChange}
								InputProps={{
									startAdornment: (<InputAdornment position="start">$</InputAdornment>)
								}} />
						</Grid>
						<Grid direction="row" item xs={12}>
							<Button onClick={() => closeModal("RESET_GAME")} className={classes.button} color="secondary">Cancel</Button>
							<Button onClick={this.sendData} className={classes.button} color="primary">Submit</Button>
						</Grid>
					</FormControl>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	players: state.players,
	message: state.games.fetchMessage,
	error: state.games.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	closeModal,
	addGame,
	loadState,
}, dispatch)

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withStyles(styles),
)(NewScore)