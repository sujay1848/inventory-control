import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import './FixtureSelector.css'
import { Link  } from "react-router-dom";

class FixtureSelector extends Component {

    FixtureSelector(props) {
        this.props = props;
    }

    render() {
        return (
            <div className="container">
                <TextField
                    id="outlined-name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                />
                <Link  to="/start"><Button variant="contained" color="secondary">Proceed</Button></Link >
            </div>
        );
    }
}
export default FixtureSelector;