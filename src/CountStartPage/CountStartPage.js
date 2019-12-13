import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import HeaderBar from "../CommonComponents/HeaderBar.js";

const mapStateToProps = state => {
  return { fixtureId: state.fixtureId };
};

class ConnectedCountStartPage extends Component {
  render() {
    if (!this.props.fixtureId) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <HeaderBar title="Inventory Control" />
        <div className="ma2">
          <span className="f4 mr2">FIXTURE ID:</span>
          <span className="underline f4">{this.props.fixtureId}</span>
        </div>
        <div className="flex flex-column ma3">
          <Link to="/scan" className="noLink">
            <Button
              style={{ width: "100%", marginBottom: 10 }}
              variant="contained"
              color="secondary"
            >
              Start Scanning
            </Button>
          </Link>
          <Link to="/" className="noLink">
            <Button className="w-100" variant="contained" color="secondary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const CountStartPage = connect(mapStateToProps)(ConnectedCountStartPage);
export default CountStartPage;
