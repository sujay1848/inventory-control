import React, { Component } from "react";

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
      <div className="w-100 flex flex-column mv2">
        <input
          type="text"
          placeholder="Type product barcode here..."
          value={this.state.text}
          ref={this.textField}
          onChange={this.handleTextChange}
          onClick={this.returnFocus}
          className="w-100 h2 mb1 br2 ph1"
        />
        <input
          type="button"
          value="ENTER"
          className="w-100 f5 b bg-green white bw0 br2 dim h2"
          onClick={() => this.onSubmit(this.state.text)}
          disabled={this.state.text === ""}
        />
      </div>
    );
  }
}

export default ScanController;
