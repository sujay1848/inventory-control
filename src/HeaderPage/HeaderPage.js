import React, { Component } from 'react';
import HeaderBar from '../CommonComponents/HeaderBar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import './HeaderPage.css';
import { connect } from 'react-redux';
import { scanFixture } from '../StateManagement/Actions';

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
        this.isButtonDisabled = this.isButtonDisabled.bind(this);
    }

    handleFixtureIdChange(event) {
        this.setState({ fixtureId: event.target.value });
    }

    handleSubmit(event) {
        const { fixtureId } = this.state;
        this.props.scanFixture({ fixtureId });
        this.setState({ fixtureId: "" });
    }

    isButtonDisabled() {
        return !this.state.fixtureId;
    }

    render() {
        return (
            <div>
                <HeaderBar title="Inventory Control" />
                <div className="container">
                    <TextField
                        autoFocus
                        id="outlined-name"
                        label="Fixture ID"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFixtureIdChange}
                    />
                    <Link to="/start" style={{ textDecoration: 'none' }}>
                        <Button disabled={this.isButtonDisabled()} style={{ width: '100%' }} fullWidth={true} variant="contained" color="secondary" onClick={this.handleSubmit}>
                            Proceed
                    </Button>
                    </Link >
                </div>
            </div>
        );
    }
}
const HeaderPage = connect(
    null,
    mapDispatchToProps
)(ConnectedHeaderPage);

export default HeaderPage;