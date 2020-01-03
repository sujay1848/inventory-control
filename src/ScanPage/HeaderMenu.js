import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="flex justify-between">
        <div className="ma2">
          <span className="f4 mr2">FIXTURE ID:</span>
          <span className="underline f4">{this.props.fixtureId}</span>
        </div>
        <FormControlLabel
          control={
            <Switch
              onChange={this.props.handleSwitchToggle}
              checked={this.props.scannerMode}
            />
          }
          label="Scanner Mode"
        />
      </div>
    );
  }
}

export default HeaderMenu;
