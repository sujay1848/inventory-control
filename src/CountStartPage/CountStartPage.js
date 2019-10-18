import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './CountStartPage.css'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

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

class StartPage extends Component {

    StartPage() { }

    getName() {
        return 'My name is start page.';
    }

    render() {
        return (<div className={useStyles.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6" className={useStyles.title}>
                        Inventory Control - Start
                    </Typography>
                </Toolbar>
            </AppBar>
            <h5>Start page.</h5>
            <Link to="/"><Button variant="contained" color="secondary">Back to Home</Button></Link >
        </div>);
    }
}
export default StartPage;