import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Redirect } from "react-router";
import { scanSkus } from "../StateManagement/Actions";
import Swal from "sweetalert2";
import { EditableTable } from "../ReviewPage/EditableTable";

const mapStateToProps = state => {
  return { fixtureId: state.fixtureId, skuCountList: state.skuCountList };
};

function mapDispatchToProps(dispatch) {
  return {
    setSkuCountList: skuCountList => dispatch(scanSkus(skuCountList))
  };
}

export class ConnectedScanPage extends Component {
  constructor(props) {
    super(props);
    this.textField = React.createRef();
    this.state = {
      currentSku: "",
      scannerMode: true
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
      currentSku: ""
    });
    this.props.setSkuCountList({ skuCountList: {} });
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

  handleSkuSave = () => {
    this.handleSkuSaveWithId(this.state.currentSku);
  };

  handleSkuSaveWithId = skuId => {
    let skuList = Object.assign({}, this.props.skuCountList);
    if (skuList[skuId]) {
      let count = skuList[skuId];
      delete skuList[skuId];
      skuList[skuId] = count + 1;
    } else if (skuId) {
      skuList[skuId] = 1;
    }
    this.setState({ currentSku: "" });
    this.props.setSkuCountList({ skuCountList: skuList });
    this.returnFocus();
  };

  isScanDisabled = () => this.state.scannerMode || !this.state.currentSku;

  disableButton = () =>
    !this.props.skuCountList ||
    Object.entries(this.props.skuCountList).length === 0;

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

  componentDidMount() {
    this.returnFocus();
  }

  render() {
    if (!this.props.fixtureId) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
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
                color="primary"
              >
                Review
              </Button>
            </Link>
          </div>
          <EditableTable
            skuCountList={this.props.skuCountList}
            setSkuCountList={this.props.setSkuCountList}
            afterDelete={this.returnFocus}
          />
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
