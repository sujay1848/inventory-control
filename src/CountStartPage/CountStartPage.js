import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

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
        <div className="ma2">
          <span className="f4 mr2">FIXTURE ID:</span>
          <span className="underline f4">{this.props.fixtureId}</span>
        </div>
        <div className="flex flex-column ma3">
          <Link to="/scan" className="noLink">
            <button className={"w-100 f5 b white bw0 br2 dim h2 bg-blue mb2"}>
              START SCANNING
            </button>
          </Link>
          <Link to="/" className="noLink">
            <button className={"w-100 f5 b white bw0 br2 dim h2 bg-red"}>
              BACK HOME
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const CountStartPage = connect(mapStateToProps)(ConnectedCountStartPage);
export default CountStartPage;
