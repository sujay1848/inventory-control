import React, { Component } from "react";

class SwitchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Selected: this.props.selected
    };
  }

  onClick = () => {
    this.setState({ selected: !this.state.selected }, () => {
      this.props.setSelected(this.state.selected);
    });
  };

  componentDidMount() {
    this.setState({ selected: this.props.selected });
  }

  render() {
    return this.state.selected ? (
      <div className="h2 w3 br2 bg-light-blue flex justify-center items-center">
        <button className="w-90 h-75 br2 bn bg-white" onClick={this.onClick}>
          <img
            src={this.props.selectedIcon}
            alt="barcode"
            className="w-100 h-100"
          />
        </button>
      </div>
    ) : (
      <button className="h2 w3 br2 bn bg-blue b--blue" onClick={this.onClick}>
        <img
          src={this.props.unselectedIcon}
          alt="barcode"
          className="w-100 h-100"
        />
      </button>
    );
  }
}

export default SwitchButton;
