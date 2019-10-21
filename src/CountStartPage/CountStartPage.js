import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './CountStartPage.css'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBar from '../CommonComponents/HeaderBar.js'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1
        }
    })
);

const mapStateToProps = state => {
    return { fixtureId: state.fixtureId };
};

class ConnectedCountStartPage extends Component {
    render() {
        if (!this.props.fixtureId) {
            return <Redirect push to="/" />;
        }

        return (<div className={useStyles.root}>
            <HeaderBar title="Inventory Control" />
            <Typography variant="overline" style={{ fontSize: 18, margin: 10, marginBottom: 0, textTransform: 'uppercase' }} >Fixture ID:
            <Typography variant="overline" style={{ fontSize: 18, margin: 10, marginBottom: 0, textDecoration: 'underline' }} >{this.props.fixtureId}</Typography>
            </Typography>
            <div style={{ display: 'flex-vertical', flexGrow: 2, margin: 10 }}>
                <Link to="/scan" style={{ textDecoration: 'none' }}>
                    <Button style={{ width: '100%', marginBottom: 10 }} variant="contained" color="secondary" >
                        Start Scanning
                    </Button>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button style={{ width: '100%' }} variant="contained" color="secondary">
                        Back to Home
                    </Button>
                </Link >
            </div>
        </div>);
    }
}

const CountStartPage = connect(mapStateToProps)(ConnectedCountStartPage);
export default CountStartPage;