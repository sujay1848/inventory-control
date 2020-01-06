import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setFixture } from "../StateManagement/Actions";
import { ViewTable } from "./ViewTable";
import { getStatus } from "../ControllerInteface/ApiCaller";

function mapDispatchToProps(dispatch) {
  return {
    setFixture: fixtureId => dispatch(setFixture(fixtureId))
  };
}

class ConnectedHeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtureId: null,
      status: []
    };
  }

  handleFixtureIdChange = event =>
    this.setState({ fixtureId: event.target.value });
  handleSubmit = event => {
    this.props.setFixture({ fixtureId: this.state.fixtureId });
  };
  isButtonDisabled = () => !this.state.fixtureId;

  componentDidMount() {
    getStatus(status => this.setState({ status: status }));
  }

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
          data={this.state.status}
        />
      </div>
    );
  }
}
const HeaderPage = connect(null, mapDispatchToProps)(ConnectedHeaderPage);

export default HeaderPage;
