import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { scanSkus } from "../StateManagement/Actions";
import Swal from "sweetalert2";
import { EditableTable } from "../ReviewPage/EditableTable";
import HeaderMenu from "./HeaderMenu";
import ScanController from "./ScanController";

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
    this.textInput = React.createRef();
    this.state = {
      scannerMode: true
    };
  }

  resetState = () => {
    this.props.setSkuCountList({ skuCountList: {} });
    this.returnFocus();
  };

  returnFocus = () => {
    if (this.textInput.current == null) return;
    this.textInput.current.returnFocus();
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
    let skuList = Object.assign({}, this.props.skuCountList);
    if (skuList[skuId]) {
      let count = skuList[skuId];
      delete skuList[skuId];
      skuList[skuId] = count + 1;
    } else if (skuId) {
      skuList[skuId] = 1;
    }
    this.props.setSkuCountList({ skuCountList: skuList });
    this.returnFocus();
  };

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
          <HeaderMenu
            scannerMode={this.state.scannerMode}
            handleSwitchToggle={this.handleSwitchToggle}
            fixtureId={this.props.fixtureId}
          />
          <EditableTable
            skuCountList={this.props.skuCountList}
            setSkuCountList={this.props.setSkuCountList}
            afterDelete={this.returnFocus}
          />
          <ScanController
            ref={this.textInput}
            scannerMode={this.state.scannerMode}
            saveUpc={this.handleSkuSaveWithId}
          />
          <div className="flex w-100">
            <input
              type="button"
              value="CLEAR"
              className={
                "flex-grow-1 f5 b white bw0 h2 br2 mr1" +
                (this.disableButton() ? "" : " bg-dark-red")
              }
              onClick={this.onClickClear}
              disabled={this.disableButton()}
            />
            <Link
              to={location =>
                this.disableButton() ? location.pathname : "/review"
              }
              className="noLink flex-grow-1 ml1"
            >
              <input
                type="button"
                value="REVIEW"
                className={
                  "w-100 f5 b white bw0 h2 br2" +
                  (this.disableButton() ? "" : " bg-blue")
                }
              />
            </Link>
          </div>
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
