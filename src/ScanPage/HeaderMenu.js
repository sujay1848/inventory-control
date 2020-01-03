import React, { Component } from "react";
import SwitchButton from "../Components/SwitchButton";
import BlueBarcode from "../Img/barcode-light-blue.svg";
import WhiteBarcode from "../Img/barcode-white.svg";
import MagnifyingGlass from "../Img/magnifying-glass.svg";

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
        <div className="flex">
          <SwitchButton
            selectedIcon={BlueBarcode}
            unselectedIcon={WhiteBarcode}
            selected={this.props.scannerMode}
            setSelected={this.props.setScannerMode}
          />
          <button
            className="h2 w2 br2 bg-blue b--blue bn ml1"
            onClick={() => {}}
          >
            <img
              src={MagnifyingGlass}
              alt="Magnifying Glass"
              className="w-100 h-100"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default HeaderMenu;
