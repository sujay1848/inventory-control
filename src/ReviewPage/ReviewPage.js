import React, { Component } from "react";
import HeaderBar from "../CommonComponents/HeaderBar.js";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { scanFixture, scanSkus } from "../StateManagement/Actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EditableTable } from "./EditableTable";
import { saveStocktake } from "../ControllerInteface/ApiCaller";
import {toast} from "react-toastify";

const mapStateToProps = state => {
  return {
    fixtureId: state.fixtureId,
    skuCountList: state.skuCountList,
    userId: state.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSkuCountList: skuCountList => dispatch(scanSkus(skuCountList)),
    setFixtureId: fixtureId => dispatch(scanFixture(fixtureId))
  };
};

const toastSuccess = () => toast.success("💾  Successfully Saved", {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true
});

const toastFailure = () => toast.error("🚫  Failed to connect", {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true
});

export class ConnectedReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  submitCount = () => {
    console.log(this.props.skuCountList);
    let { userId, fixtureId, skuCountList } = this.props;
    saveStocktake(userId, fixtureId, skuCountList, toastSuccess, toastFailure);
    this.props.setSkuCountList({});
    this.props.setFixtureId({});
  };

  disableButton = () =>
    !this.props.skuCountList ||
    Object.entries(this.props.skuCountList).length === 0;

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
          <Button onClick={this.submitCount} color="primary">
            Yes
          </Button>
          <Button
            onClick={() => {
              this.setState({
                dialogOpen: false
              });
            }}
            color="primary"
            autoFocus
          >
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
          <div className="flex ma2">
            <span className="f4 mr2">FIXTURE ID:</span>
            <span className="underline f4">{this.props.fixtureId}</span>
          </div>
          <div>
            <EditableTable
              skuCountList={this.props.skuCountList}
              setSkuCountList={this.props.setSkuCountList}
            />
          </div>
          <div className="flex flex-column">
            <Button
              style={{ width: "100%", marginBottom: 10 }}
              disabled={this.disableButton()}
              variant="contained"
              onClick={() => {
                this.setState({
                  dialogOpen: true
                });
              }}
              color="primary"
            >
              Submit
            </Button>
            <div>{this.getDialogBox()}</div>
          </div>
        </div>
      </div>
    );
  }
}
const ScanPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedReviewPage);
export default ScanPage;
