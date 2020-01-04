import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
          <TextField
            autoFocus
            id="outlined-name"
            label="Fixture ID"
            margin="normal"
            variant="outlined"
            onChange={this.handleFixtureIdChange}
          />
          <Link
            to={location =>
              this.isButtonDisabled() ? location.pathname : "/start"
            }
            className="noLink"
          >
            <Button
              disabled={this.isButtonDisabled()}
              className="w-100"
              fullWidth={true}
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
            >
              Proceed
            </Button>
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
