import React, { Component } from 'react'
import HeaderBar from '../CommonComponents/HeaderBar.js'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class SummaryPage extends Component {

    render() {
        return (
        <HeaderBar title="Summary">
            <Link to="/start" style={{ textDecoration: 'none' }}>
                <Button style={{ width: '100%' }} fullWidth={true} variant="contained" color="secondary" >
                    Back
                </Button>
            </Link>
        </HeaderBar>
        );
    }
}

export default SummaryPage;