import React, { Component } from 'react' 
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Paper, withStyles } from '@material-ui/core'
import { compose }  from "recompose"

import { getLastGame } from '../redux/modules/games'
import { loadState } from '../redux/modules/user'
import PlayerCard from '../components/PlayerCard'

const styles = theme => ({
    root: {
        textAlign: "center",
    },
    paper: {
        paddingTop: "5vh",
        paddingBottom: "3vh",
    },
    h1: {
        textAlign: "center",
        paddingTop: "5vh",
        paddingBottom: "3vh",
        margin: 0,
    },
    mainGrid: {
        paddingBottom: "3vh",
    }
})

class Welcome extends Component {
    componentDidMount() {
        const { loadState, getLastGame } = this.props
        
        loadState()
        getLastGame()
    }

    render() {
        const { players, getLastGame, classes: { h1, mainGrid, root } } = this.props

        return (
            <div>
                <Grid
                    container
                    justify="flex-start" 
                    direction="column"
                    alignItems="stretch"
                    className={mainGrid}>
                    <Grid item xs={12}>
                        <Paper>
                            <h1 className={h1}>Winner Winner Chicken Dinner!</h1>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction="column"
                    alignItems="stretch"
                    className={mainGrid}>
                    <Grid item className={root}>
                        <Paper>
                            <h1 className={h1}>On a lucky streak!</h1>
                            i won the last game
                        </Paper>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction="column"
                    alignItems="stretch"
                    className={mainGrid}>
                    <Grid item>
                        <Paper>
                            <h1 className={h1}>All I do is win!</h1>
                            I have the most wins
                        </Paper>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    className={mainGrid}>
                    {
                        players.map((player) => {
                            return <PlayerCard key={player.id} player={player} />
                        })
                    }
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    players: state.players
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadState,
    getLastGame,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Welcome)