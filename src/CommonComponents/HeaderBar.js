import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }

  render() {
    return (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {this.state.title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
