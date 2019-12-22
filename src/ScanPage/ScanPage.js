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
import Swal from "sweetalert2";

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
      scannerMode: true,
      skuCountList: {}
    };
  }

  handleSkuIdChange = event => {
    this.setState({
      currentSku: event.target.value
    });
    if (this.state.scannerMode) {
      this.handleSkuSaveWithId(event.target.value);
    }
  };

  resetState = () => {
    this.setState({
      currentSku: "",
      skuCountList: {}
    });
    this.returnFocus();
  };

  returnFocus = () => {
    if (this.textField.current == null) return;
    this.textField.current.focus();
    if (this.state.scannerMode) {
      // Hide virtual keyboard
      this.textField.current.setAttribute("readonly", true);
      setTimeout(() => {
        this.textField.current.removeAttribute("readonly");
      }, 100);
    }
  };

  handleSwitchToggle = () => {
    this.setState(
      {
        scannerMode: !this.state.scannerMode
      },
      this.returnFocus
    );
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

  submitCount = event => {
    const { skuCountList } = this.state;
    this.props.sendSkuCountList({ skuCountList });
  };

  disableButton = () =>
    !this.state.skuCountList ||
    Object.entries(this.state.skuCountList).length === 0;

  componentDidMount() {
    this.returnFocus();
  }

  onClickClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCloseButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!"
    }).then(result => {
      if (result.value) {
        this.resetState();
      }
    });
  };

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
            onClick={this.returnFocus}
          />
          <div className="flex flex-column">
            <Button
              style={{ width: "100%", marginBottom: 20 }}
              variant="contained"
              color="secondary"
              disabled={this.isScanDisabled()}
              onClick={this.handleSkuSave}
            >
              Enter
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 10 }}
              variant="contained"
              color="secondary"
              onClick={this.onClickClear}
            >
              Clear
            </Button>
            <Link to="/review" className="noLink">
              <Button
                style={{ width: "100%", marginBottom: 10 }}
                disabled={this.disableButton()}
                variant="contained"
                onClick={this.submitCount}
                color="primary"
              >
                Review
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
