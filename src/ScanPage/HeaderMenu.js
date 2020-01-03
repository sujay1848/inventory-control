import React, { Component } from "react";
import SwitchButton from "../Components/SwitchButton";
import BlueBarcode from "../Img/barcode-blue.svg";
import WhiteBarcode from "../Img/barcode-white.svg";

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
        <SwitchButton
          selectedIcon={BlueBarcode}
          unselectedIcon={WhiteBarcode}
          selected={this.props.scannerMode}
          setSelected={this.props.setScannerMode}
        />
      </div>
    );
  }
}

export default HeaderMenu;
