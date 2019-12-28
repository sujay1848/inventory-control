import React, { Component } from "react";
import memoize from "memoize-one";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Bin from "../Img/delete.svg";
import Swal from "sweetalert2";

export class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
      page: 1,
      searchField: 0,
      searchTerm: ""
    };
  }

  // Number of items per page
  vol = 5;

  filerSkuList = memoize((list, keyword, field) => {
    list = Object.entries(list).reverse();
    console.log("Filtering...");
    if (keyword === "") return list;
    return list.filter(tuple => {
      if (field === 0) {
        return tuple[0].includes(keyword);
      } else if (field === 1) {
        return Number(keyword) && tuple[1] === Number(keyword);
      }
      return false;
    });
  });

  pagedSkuList = (list, page, vol) => {
    return list.slice((page - 1) * vol, page * vol);
  };

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

  onClickDelete = key => {
    Swal.fire({
      title: "Delete?",
      text: "SKU " + key,
      icon: "warning",
      showCloseButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Confirm"
    }).then(result => {
      if (result.value) {
        this.onRemoveSku(key);
        if (this.props.afterDelete) this.props.afterDelete();
      }
    });
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
                onClick={() => this.onClickDelete(data[0])}
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    let totalPage = Math.ceil(
      this.filerSkuList(
        this.props.skuCountList,
        this.state.searchTerm,
        this.state.searchField
      ).length / this.vol
    );
    // Change to second last page, after deletion of last page
    if (this.state.page > totalPage) this.setState({ page: totalPage });
    // Change to first page from 0 page, after adding of the first record
    if (this.state.page < 1 && totalPage > 0) this.setState({ page: 1 });
  }

  render() {
    let list = this.filerSkuList(
      this.props.skuCountList,
      this.state.searchTerm,
      this.state.searchField
    );
    let totalPage = Math.ceil(list.length / this.vol);
    let viewableList = this.pagedSkuList(list, this.state.page, this.vol);

    return (
      <React.Fragment>
        <div className="flex items-center justify-end pa1">
          <select
            id="search-select"
            className="w-30 h-100"
            onChange={event =>
              this.setState({ searchField: event.target.selectedIndex })
            }
          >
            <option value="sku" className="">
              Sku
            </option>
            <option value="count" className="">
              Count
            </option>
          </select>
          <input
            type="text"
            className="w-70 h-100"
            placeholder="Search Term"
            onChange={event =>
              this.setState({ searchTerm: event.target.value })
            }
          />
        </div>
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
            {viewableList.map(tuple => this.tableRow(tuple))}
          </TableBody>
        </Table>
        {totalPage > 0 && (
          <div className="flex justify-center items-center helvetica pa2 bg-light-gray mb2">
            <input
              type="button"
              className={
                "b--none bg-transparent f5 b" +
                (this.state.page < 2 ? " hidden" : "")
              }
              value="|<"
              onClick={() => this.setState({ page: 1 })}
            />
            <input
              type="button"
              className={
                "b--none bg-transparent f5 b" +
                (this.state.page < 2 ? " hidden" : "")
              }
              value="<"
              onClick={() => this.setState({ page: this.state.page - 1 })}
            />
            <span className="f5">
              {" "}
              {this.state.page} / {totalPage} page{" "}
            </span>
            <input
              type="button"
              className={
                "b--none bg-transparent f5 b" +
                (this.state.page === totalPage ? " hidden" : "")
              }
              value=">"
              onClick={() => this.setState({ page: this.state.page + 1 })}
            />
            <input
              type="button"
              className={
                "b--none bg-transparent f5 b" +
                (this.state.page === totalPage ? " hidden" : "")
              }
              value=">|"
              onClick={() => this.setState({ page: totalPage })}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}
