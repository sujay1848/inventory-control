import React, { Component } from "react";

export class ViewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  rows = data => {
    data.sort((d1, d2) => d1.count - d2.count);
    return data.map(row => this.row(row));
  };

  row = rowData => {
    return (
      <div
        key={rowData.fixtureId}
        className="flex justify-between w-100 h3 bb bw1 b--black-20 ph3"
      >
        <div className="flex flex-column justify-center w-70">
          <div className="f4 b">{rowData.fixtureId}</div>
          <div className="f5">{rowData.description}</div>
        </div>
        <div className="flex flex-column justify-center w-30">
          <div className="tc f5 b">{rowData.count}</div>
          {rowData.count > 0 ? (
            <div className="flex justify-center items-center h2 br2 bg-green white b">
              <span>Complete</span>
            </div>
          ) : (
            <div className="flex justify-center items-center h2 br2 bg-dark-red white b">
              <span>Incomplete</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    if (!Array.isArray(this.props.data) || this.props.data.length < 1) {
      return <React.Fragment />;
    } else {
      return (
        <div className="flex flex-column w-100">
          <div className="w-100 h2 flex items-center bg-light-gray bb b--black-20 ph3">
            <div className="w-70 tc f5 b">Fixture</div>
            <div className="w-30 tc f5 b">Status</div>
          </div>

          <div className="flex flex-column">{this.rows(this.props.data)}</div>
        </div>
      );
    }
  }
}
