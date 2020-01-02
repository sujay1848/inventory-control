import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ScanController extends Component {
  constructor(props) {
    super(props);
    this.textField = React.createRef();
    this.state = {
      text: ""
    };
  }

  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
    if (this.props.scannerMode) {
      this.onSubmit(event.target.value);
    }
  };

  onSubmit = upc => {
    this.props.saveUpc(upc);
    this.setState({ text: "" });
  };

  returnFocus = () => {
    if (this.textField.current == null) return;
    this.textField.current.focus();
    if (this.props.scannerMode) {
      // Hide virtual keyboard
      this.textField.current.setAttribute("readonly", true);
      setTimeout(() => {
        this.textField.current.removeAttribute("readonly");
      }, 100);
    }
  };

  render() {
    return (
      <React.Fragment>
        <TextField
          id="outlined-name"
          label="UPC"
          margin="normal"
          variant="outlined"
          value={this.state.text}
          autoFocus
          inputRef={this.textField}
          onChange={this.handleTextChange}
          onClick={this.returnFocus}
        />
        <Button
          style={{ width: "100%", marginBottom: 20 }}
          variant="contained"
          color="secondary"
          disabled={this.state.text === ""}
          onClick={() => this.onSubmit(this.state.text)}
        >
          Enter
        </Button>
      </React.Fragment>
    );
  }
}

export default ScanController;
