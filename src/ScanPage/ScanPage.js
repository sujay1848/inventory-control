import React, { Component } from "react";
import HeaderBar from "../CommonComponents/HeaderBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Redirect } from "react-router";
import { scanSkus } from "../StateManagement/Actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    this.textField = React.createRef();
    this.state = {
      currentSku: "",
      dialogOpen: false,
      scannerMode: false,
      skuCountList: {}
    };
  }

  handleSkuIdChange = event => {
    this.setState({
      currentSku: event.target.value,
      skuCountList: this.state.skuCountList,
      scannerMode: this.state.scannerMode
    });
    if (this.state.scannerMode) {
      this.handleSkuSaveWithId(event.target.value);
    }
  };

  resetState = () => {
    this.setState({
      currentSku: "",
      scannerMode: false,
      skuCountList: {}
    });
    this.returnFocus();
  };

  returnFocus = () => {
    this.textField.current.focus();
  };

  handleSwitchToggle = () => {
    var previousScannerModeState = this.state.scannerMode;
    this.setState({
      currentSku: this.state.currentSku,
      scannerMode: !previousScannerModeState,
      skuCountList: this.state.skuCountList
    });
    this.returnFocus();
  };

  handleSkuSaveWithId = skuId => {
    var skuList = this.state.skuCountList;
    if (this.state.skuCountList[skuId]) {
      skuList[skuId] = this.state.skuCountList[skuId] + 1;
    } else if (skuId) {
      skuList[skuId] = 1;
    }
    this.setState({ skuCountList: skuList, currentSku: "" });
    this.returnFocus();
  };

  handleSkuSave = () => {
    this.handleSkuSaveWithId(this.state.currentSku);
  };

  isScanDisabled = () => {
    if (this.state.scannerMode) {
      return true;
    }
    return !this.state.currentSku;
  };

  getSkuTable = () => {
    if (
      this.state.skuCountList &&
      Object.entries(this.state.skuCountList).length > 0
    ) {
      return (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="f5">SKU ID</span>
              </TableCell>
              <TableCell>
                <span className="f5">Count</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(this.state.skuCountList).map(keys => (
              <TableRow key={keys[0]}>
                <TableCell>{keys[0]}</TableCell>
                <TableCell>{keys[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  handleClickOpen = () => {
    this.setState({
      dialogOpen: true
    });
  };

  submitCount = () => {
    const { skuCountList } = this.state;
    this.props.sendSkuCountList({ skuCountList });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  disableButton = () =>
    !this.state.skuCountList ||
    Object.entries(this.state.skuCountList).length === 0;

  getDialogBox() {
    return (
      <Dialog
        open={this.state.dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Finished scanning?"}
        </DialogTitle>
        <DialogActions>
          <Link to="/summary" className="noLink">
            <Button onClick={this.submitCount} color="primary">
              Yes
            </Button>
          </Link>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    if (!this.props.fixtureId) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <HeaderBar title="Inventory Control" />
        <div className="flex flex-column ma3">
          <div className="flex justify-between">
            <div className="ma2">
              <span className="f4 mr2">FIXTURE ID:</span>
              <span className="underline f4">{this.props.fixtureId}</span>
            </div>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleSwitchToggle}
                  checked={this.state.scannerMode}
                />
              }
              label="Scanner Mode"
            />
          </div>
          <TextField
            id="outlined-name"
            label="CSKU ID"
            margin="normal"
            variant="outlined"
            autoFocus
            inputRef={this.textField}
            value={this.state.currentSku}
            onChange={this.handleSkuIdChange}
            inputProps={{ inputmode: "none" }}
          />
          <div className="flex flex-column">
            <Button
              style={{ width: "100%", marginBottom: 20 }}
              variant="contained"
              color="secondary"
              disabled={this.isScanDisabled()}
              onClick={this.handleSkuSave}
            >
              Scan
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 10 }}
              variant="contained"
              color="secondary"
              onClick={this.resetState}
            >
              Start Again
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 10 }}
              disabled={this.disableButton()}
              variant="contained"
              onClick={this.handleClickOpen}
              color="primary"
            >
              Review
            </Button>
            <div>{this.getDialogBox()}</div>
            <Link to="/start" className="noLink">
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="secondary"
              >
                Return
              </Button>
            </Link>
          </div>
          <div>{this.getSkuTable()}</div>
        </div>
      </div>
    );
  }
}
const ScanPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedScanPage);
export default ScanPage;
