import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FixtureSelector from '../FixtureSelector/FixtureSelector.js'
import './HeaderComponent.css'

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

class HeaderComponent extends Component {

    HeaderComponent() { }

    render() {
        return (<div className={useStyles.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h5" className={useStyles.title}>
                        Inventory Control
                    </Typography>
                </Toolbar>
            </AppBar>
            <FixtureSelector />
        </div>);
    }
}
export default HeaderComponent;