import React, { Component } from "react";
import HeaderBar from "../CommonComponents/HeaderBar.js";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Redirect } from "react-router";
import { scanFixture, scanSkus } from "../StateManagement/Actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const mapStateToProps = state => {
  return { fixtureId: state.fixtureId, skuCountList: state.skuCountList };
};

const mapDispatchToProps = dispatch => {
  return {
    setSkuCountList: skuCountList => dispatch(scanSkus(skuCountList)),
    setFixtureId: fixtureId => dispatch(scanFixture(fixtureId))
  };
};

export class ConnectedReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSku: "",
      dialogOpen: false
    };
  }

  getSkuTable = () => {
    if (
      this.props.skuCountList &&
      Object.entries(this.props.skuCountList).length > 0
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
            {Object.entries(this.props.skuCountList).map(keys => (
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
    this.props.setSkuCountList({ skuCountList });
    this.props.setFixtureId({});
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
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
          <Button onClick={this.handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    console.log(this.props.skuCountList);
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
          <div>{this.getSkuTable()}</div>
          <div className="flex flex-column">
            <Button
              style={{ width: "100%", marginBottom: 10 }}
              disabled={this.disableButton()}
              variant="contained"
              onClick={this.handleClickOpen}
              color="primary"
            >
              Submit
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
