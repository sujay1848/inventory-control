import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import './FixtureSelector.css'
import { Link } from "react-router-dom";

class FixtureSelector extends Component {

    constructor(props) {
        super(props);
        this.handleFixtureIdChange = this.handleFixtureIdChange.bind(this);
        this.handleFixtureSave = this.handleFixtureSave.bind(this);
        this.state = {fixtureId: null};
    }

    handleFixtureIdChange(event) {
        this.setState({fixtureId: event.target.value});
    }

    handleFixtureSave() {
        console.log(this.state.fixtureId);
    }

    render() {
        return (
            <div className="container">
                <TextField
                    id="outlined-name"
                    label="Fixture ID"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleFixtureIdChange}
                />
                <Link to="/start"><Button variant="contained" color="secondary" onClick={this.handleFixtureSave}>Proceed</Button></Link >
            </div>
        );
    }
}
export default FixtureSelector;