import React, { Component } from 'react';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import '../HeaderPage/HeaderPage.css'; import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

export default class ScanPage extends Component {

    constructor(props) {
        super(props);
        this.handleSkuIdChange = this.handleSkuIdChange.bind(this);
        this.handleSkuSave = this.handleSkuSave.bind(this);
        this.resetState = this.resetState.bind(this);
        this.getSkuTable = this.getSkuTable.bind(this);
        this.state = {
            currentSku: '',
            skuCountList: {}
        }
    }

    handleSkuIdChange(event) {
        this.setState({ currentSku: event.target.value });
    }

    resetState() {
        this.setState({
            currentSku: '',
            skuCountList: {}
        });
    }

    handleSkuSave(event) {
        var skuId = this.state.currentSku;
        var skuList = this.state.skuCountList;
        if (this.state.skuCountList[skuId]) {
            skuList[skuId] = this.state.skuCountList[skuId] + 1;
        } else if (skuId) {
            skuList[skuId] = 1;
        }
        this.setState({ skuCountList: skuList, currentSku: '' });
    }

    isScanDisabled() {
        return !this.state.currentSku;
    }

    getSkuTable() {
        if (this.state.skuCountList && Object.entries(this.state.skuCountList).length > 0) {
            return (<Table>
                <TableHead>
                    <TableCell><Typography variant="h6">SKU ID</Typography></TableCell>
                    <TableCell><Typography variant="h6">Count</Typography></TableCell>
                </TableHead>
                <TableBody>
                    {Object.entries(this.state.skuCountList).map((keys) =>
                        <TableRow>
                            <TableCell>{keys[0]}</TableCell>
                            <TableCell>{keys[1]}</TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>);
        }
    }
    render() {
        return (
            <div>
                <HeaderBar title="Inventory Control" />
                <div className="container">
                    <TextField
                        id="outlined-name"
                        label="CSKU ID"
                        margin="normal"
                        variant="outlined"
                        autoFocus
                        value={this.state.currentSku}
                        onChange={this.handleSkuIdChange}
                    />
                    <div style={{ display: 'flex-vertical', flexGrow: 2 }}>
                        <Button style={{ width: '100%', marginBottom: 10 }} variant="contained" color="secondary" disabled={this.isScanDisabled()} onClick={this.handleSkuSave}>
                            Scan
                        </Button>
                        <Button style={{ width: '100%', marginBottom: 10 }} variant="contained" color="secondary" onClick={this.resetState}>
                            Start Again
                        </Button>
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