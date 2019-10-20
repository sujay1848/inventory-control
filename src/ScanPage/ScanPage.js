import React, { Component } from 'react';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import '../HeaderPage/HeaderPage.css';

export default class ScanPage extends Component {

    constructor(props) {
        super(props);
        this.handleSkuIdChange = this.handleSkuIdChange.bind(this);
        this.handleSkuSave = this.handleSkuSave.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = {
            currentSku: '',
            skuList: []
        }
    }

    handleSkuIdChange(event) {
        this.setState({ currentSku: event.target.value });
    }

    resetState() {
        this.setState({
            currentSku: '',
            skuList: []
        });
    }

    handleSkuSave(event) {
        var skuId = this.state.currentSku;
        var localSkuList = this.state.skuList;
        localSkuList.push(skuId);
        this.setState({ skuList: localSkuList, currentSku: '' });
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
                        value={this.state.currentSku}
                        onChange={this.handleSkuIdChange}
                    />
                    <p>SKUs scanned: {this.state.skuList.length}</p>
                    <div style={{ display: 'flex-vertical', flexGrow: 2 }}>
                        <Button style={{ width: '100%' , marginBottom: 10 }} variant="contained" color="secondary" onClick={this.handleSkuSave}>
                            Scan
                        </Button>
                        <Button style={{ width: '100%' , marginBottom: 10 }} variant="contained" color="secondary" onClick={this.resetState}>
                            Start Again
                        </Button>
                        <Link to="/start" style={{ textDecoration: 'none' }}>
                            <Button style={{ width: '100%' }} variant="contained" color="secondary">
                                Return
                            </Button>
                        </Link >
                    </div>
                </div>
            </div >
        );
    }
}