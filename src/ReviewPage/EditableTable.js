import React, { Component } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";

export class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null
    };
  }

  onCountChange = (tuple, valChange) => {
    let list = Object.assign({}, this.props.skuCountList);
    list[tuple[0]] = tuple[1] + valChange;
    this.props.setSkuCountList({ skuCountList: list });
  };

  isSelected = key => key === this.state.selectedKey;

  tableRow = data => {
    return (
      <TableRow
        key={data[0]}
        selected={this.isSelected(data[0])}
        onClick={() => {
          this.setState({ selectedKey: data[0] });
        }}
      >
        <TableCell align="center">{data[0]}</TableCell>
        <TableCell align="center">
          <button
            className={
              "b--none bg-transparent f3 mr2" +
              (this.isSelected(data[0]) ? "" : " hidden")
            }
            onClick={() => this.onCountChange(data, 1)}
          >
            +
          </button>
          {data[1]}
          <button
            className={
              "b--none bg-transparent f3 ml2" +
              (this.isSelected(data[0]) && data[1] > 1 ? "" : " hidden")
            }
            onClick={() => this.onCountChange(data, -1)}
          >
            -
          </button>
        </TableCell>
      </TableRow>
    );
  };

  render() {
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <span className="f5">SKU ID</span>
            </TableCell>
            <TableCell align="center">
              <span className="f5">Count</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(this.props.skuCountList).map(keys =>
            this.tableRow(keys)
          )}
        </TableBody>
      </Table>
    );
  }
}
