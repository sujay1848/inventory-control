import React, { Component } from 'react';
import HeaderBar from '../CommonComponents/HeaderBar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../HeaderPage/HeaderPage.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Redirect } from 'react-router';
import { scanSkus } from '../StateManagement/Actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => {
    return { fixtureId: state.fixtureId, skuCountList: state.skuCountList };
};

function mapDispatchToProps(dispatch) {
    return {
        sendSkuCountList: skuCountList => dispatch(scanSkus(skuCountList))
    };
}

export class ConnectedScanPage extends Component {

    constructor(props) {
        super(props);
        this.handleSkuIdChange = this.handleSkuIdChange.bind(this);
        this.handleSkuSave = this.handleSkuSave.bind(this);
        this.resetState = this.resetState.bind(this);
        this.getSkuTable = this.getSkuTable.bind(this);
        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleSkuSaveWithId = this.handleSkuSaveWithId.bind(this);
        this.textField = React.createRef();
        this.returnFocus = this.returnFocus.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.state = {
            currentSku: '',
            dialogOpen: false,
            scannerMode: false,
            skuCountList: {}
        }
    }

    handleSkuIdChange(event) {
        this.setState({
            currentSku: event.target.value,
            skuCountList: this.state.skuCountList,
            scannerMode: this.state.scannerMode
        });
        if (this.state.scannerMode) {
            this.handleSkuSaveWithId(event.target.value);
        }
    }

    resetState() {
        this.setState({
            currentSku: '',
            scannerMode: false,
            skuCountList: {}
        });
        this.returnFocus();
    }

    returnFocus() {
        this.textField.current.focus();
    }

    handleSwitchToggle() {
        var previousScannerModeState = this.state.scannerMode;
        this.setState({
            currentSku: this.state.currentSku,
            scannerMode: !previousScannerModeState,
            skuCountList: this.state.skuCountList
        });
        this.returnFocus();
    }

    handleSkuSaveWithId(skuId) {
        var skuList = this.state.skuCountList;
        if (this.state.skuCountList[skuId]) {
            skuList[skuId] = this.state.skuCountList[skuId] + 1;
        } else if (skuId) {
            skuList[skuId] = 1;
        }
        this.setState({ skuCountList: skuList, currentSku: '' });
        this.returnFocus();
    }

    handleSkuSave() {
        this.handleSkuSaveWithId(this.state.currentSku);
    }

    isScanDisabled() {
        if (this.state.scannerMode) { return true; }
        return !this.state.currentSku;
    }

    getSkuTable() {
        if (this.state.skuCountList && Object.entries(this.state.skuCountList).length > 0) {
            return (<Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h6">SKU ID</Typography></TableCell>
                        <TableCell><Typography variant="h6">Count</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(this.state.skuCountList).map((keys) =>
                        <TableRow key={keys[0]}>
                            <TableCell>{keys[0]}</TableCell>
                            <TableCell>{keys[1]}</TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>);
        }
    }

    handleClickOpen() {
        this.setState({
            dialogOpen: true
        });
    }

    submitCount() {
        const { skuCountList } = this.state;
        this.props.sendSkuCountList({ skuCountList });
    }

    handleClose() {
        this.setState({
            dialogOpen: false
        });
    }

    disableButton() {
        return !this.state.skuCountList || Object.entries(this.state.skuCountList).length === 0;
    }

    getDialogBox() {
        return (
            <Dialog
                open={this.state.dialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Finished scanning?"}</DialogTitle>
                <DialogActions>
                    <Link to="/summary" style={{ textDecoration: 'none' }}>
                        <Button onClick={this.submitCount.bind(this)} color="primary">
                            Yes
                    </Button>
                    </Link>
                    <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>);
    }

    render() {
        if (!this.props.fixtureId) {
            return <Redirect push to="/" />;
        }
        return (
            <div>
                <HeaderBar title="Inventory Control" />
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant="overline" style={{ fontSize: 18, margin: 10, marginBottom: 0, textTransform: 'uppercase' }} >Fixture ID:
                                <Typography variant="overline" style={{ fontSize: 18, margin: 10, marginBottom: 0, textDecoration: 'underline' }} >{this.props.fixtureId}</Typography>
                            </Typography>
                        </div>
                        <FormControlLabel
                            control={
                                <Switch onChange={this.handleSwitchToggle} checked={this.state.scannerMode} />
                            }
                            label="Scanner Mode"
                        />
                    </div>
                    <TextField
                        id="outlined-name"
                        label="CSKU IDD"
                        margin="normal"
                        variant="outlined"
                        autoFocus
                        inputRef={this.textField}
                        value={this.state.currentSku}
                        onChange={this.handleSkuIdChange}
                        inputProps={{inputmode: "none"}}
                    />
                    <input type="text" inputMode="none"/>
                    <div style={{ display: 'flex-vertical', flexGrow: 2 }}>
                        <Button style={{ width: '100%', marginBottom: 20 }} variant="contained" color="secondary" disabled={this.isScanDisabled()} onClick={this.handleSkuSave}>
                            Scan
                        </Button>
                        <Button style={{ width: '100%', marginBottom: 10 }} variant="contained" color="secondary" onClick={this.resetState}>
                            Start Again
                        </Button>
                        <Button style={{ width: '100%', marginBottom: 10 }} disabled={this.disableButton()} variant="contained" onClick={this.handleClickOpen} color="primary">
                            Finish Scanning
                        </Button>
                        <div>{this.getDialogBox()}</div>
                        <Link to="/start" style={{ textDecoration: 'none' }}>
                            <Button style={{ width: '100%' }} variant="contained" color="secondary">
                                Return
                            </Button>
                        </Link >
                    </div>
                    <div>{this.getSkuTable()}</div>
                </div>
            </div >
        );
    }
}
const ScanPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedScanPage);
export default ScanPage;