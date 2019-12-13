import React, { Component } from "react";
import HeaderBar from "../CommonComponents/HeaderBar.js";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const mapStateToProps = state => {
  return { skuCountList: state.skuCountList };
};

class ConnectedSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hasSkuCount = () => {
    return (
      this.props.skuCountList &&
      Object.entries(this.props.skuCountList).length > 0
    );
  };

  getSkuTable = () => {
    if (this.hasSkuCount()) {
      return (
        <div>
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
        </div>
      );
    }
  };

  render() {
    if (!this.hasSkuCount()) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <HeaderBar title="Summary" />
        <div className="flex flex-column ma3">
          <span className="f4">Final Counts</span>
          <div>{this.getSkuTable()}</div>
          <Link to="/scan" className="noLink">
            <Button
              style={{ width: "100%" }}
              fullWidth={true}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const SummaryPage = connect(mapStateToProps)(ConnectedSummaryPage);
export default SummaryPage;
