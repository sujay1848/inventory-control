import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './CountStartPage.css'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

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

const ConnectedCountStartPage = ({ fixtureId, enableCounting }) => {
    return (<div className={useStyles.root}>
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Typography variant="h6">
                    Inventory Control
                    </Typography>
            </Toolbar>
        </AppBar>
        <Typography variant="overline" style={{ fontSize: 21, margin: 10, marginBottom: 0, textTransform: 'uppercase' }} >Fixture ID:
        <Typography variant="overline" style={{ fontSize: 21, margin: 10, marginBottom: 0, textDecoration: 'underline' }} >{fixtureId}</Typography>
        </Typography>
        <div id="buttonWrapper" style={{ display: 'flex-vertical', flexGrow: 2, margin: 10 }}>
            <Button style={{ width: '100%', marginBottom: 10 }} variant="contained" color="secondary" >
                Start Scanning
            </Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button style={{ width: '100%' }} variant="contained" color="secondary">
                    Back to Home
            </Button>
            </Link >
        </div>
    </div>);
}
const CountStartPage = connect(mapStateToProps)(ConnectedCountStartPage);
export default CountStartPage;