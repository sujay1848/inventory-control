import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setFixture } from "../StateManagement/Actions";
import { ViewTable } from "./ViewTable";

function mapDispatchToProps(dispatch) {
  return {
    setFixture: fixtureId => dispatch(setFixture(fixtureId))
  };
}

class ConnectedHeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = { fixtureId: null };
    this.mockData = [
      { fixtureId: "A01", count: 2 },
      { fixtureId: "A02", count: 0 },
      { fixtureId: "A03", count: 4 }
    ];
    this.mockHeader = ["fixtureId", "count"];
    this.mockDisplayHeader = ["Fixture Id", "Stocktake Completed"];
  }

  handleFixtureIdChange = event =>
    this.setState({ fixtureId: event.target.value });
  handleSubmit = event => {
    this.props.setFixture({ fixtureId: this.state.fixtureId });
  };
  isButtonDisabled = () => !this.state.fixtureId;

  render() {
    return (
      <div>
        <div className="flex flex-column ma3">
          <input
            type="text"
            placeholder="Type fixture ID here..."
            onChange={this.handleFixtureIdChange}
            className="w-100 h2 mb2 br2 ph1"
          />
          <Link
            to={location =>
              this.isButtonDisabled() ? location.pathname : "/start"
            }
            className="noLink"
          >
            <button
              className={
                "w-100 f5 b white bw0 br2 dim h2" +
                (this.isButtonDisabled() ? "" : " bg-blue")
              }
              disabled={this.isButtonDisabled()}
              onClick={this.handleSubmit}
            >
              PROCEED
            </button>
          </Link>
        </div>

        <ViewTable
          data={this.mockData}
          labels={this.mockDisplayHeader}
          headers={this.mockHeader}
        />
      </div>
    );
  }
}
const HeaderPage = connect(null, mapDispatchToProps)(ConnectedHeaderPage);

export default HeaderPage;
