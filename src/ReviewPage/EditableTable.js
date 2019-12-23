import React, { Component } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Bin from "../Img/delete.svg";

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

  onRemoveSku = key => {
    let list = Object.assign({}, this.props.skuCountList);
    delete list[key];
    this.props.setSkuCountList({ skuCountList: list });
    // Overwrite the setting of selectedKey from TableRow onClick
    setTimeout(() => this.setState({ selectedKey: null }), 50);
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
          <div className="flex justify-between items-center">
            <div className=""></div>
            <div className="flex items-center">
              <button
                className={
                  "b--none bg-transparent f3 mr2" +
                  (this.isSelected(data[0]) ? "" : " hidden")
                }
                onClick={() => this.onCountChange(data, 1)}
              >
                +
              </button>
              <span>{data[1]}</span>
              <button
                className={
                  "b--none bg-transparent f3 ml2" +
                  (this.isSelected(data[0]) && data[1] > 1 ? "" : " hidden")
                }
                onClick={() => this.onCountChange(data, -1)}
              >
                -
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="image"
                src={Bin}
                alt="bin"
                onClick={() => this.onRemoveSku(data[0])}
                className={
                  "h1 w-auto" + (this.isSelected(data[0]) ? "" : " hidden")
                }
              />
            </div>
          </div>
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
              <span className="f5 b">SKU ID</span>
            </TableCell>
            <TableCell align="center">
              <span className="f5 b">Count</span>
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
