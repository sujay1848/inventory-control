import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import './HeaderPage.css';
import { connect } from 'react-redux';
import { scanFixture } from '../StateManagement/Actions';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(3),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function mapDispatchToProps(dispatch) {
    return {
        scanFixture: fixtureId => dispatch(scanFixture(fixtureId))
    };
}

class ConnectedHeaderPage extends Component {

    constructor(props) {
        super(props);
        this.state = { fixtureId: null };
        this.handleFixtureIdChange = this.handleFixtureIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFixtureIdChange(event) {
        this.setState({ fixtureId: event.target.value });
    }

    handleSubmit(event) {
        const { fixtureId } = this.state;
        this.props.scanFixture({ fixtureId });
        this.setState({ fixtureId: "" });
    }

    render() {
        return (<div className={useStyles.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6" className={useStyles.title}>
                        Inventory Control
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="container">
                <TextField
                    id="outlined-name"
                    label="Fixture ID"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleFixtureIdChange}
                />
                <Link to="/start"><Button variant="contained" color="secondary" onClick={this.handleSubmit}>Proceed</Button></Link >
            </div>
        </div>);
    }
}
const HeaderPage = connect(
    null,
    mapDispatchToProps
)(ConnectedHeaderPage);

export default HeaderPage;