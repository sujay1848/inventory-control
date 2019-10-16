import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import './FixtureSelector.css'

class FixtureSelector extends Component {

    render() {
        return (
            <div className="container">
                <TextField
                    id="outlined-name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="contained" color="secondary">Proceed</Button>
            </div>
        );
    }
}
export default FixtureSelector;