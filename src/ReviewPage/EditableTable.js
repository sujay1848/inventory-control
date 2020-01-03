import React, { Component } from "react";
import memoize from "memoize-one";
import Swal from "sweetalert2";
import { Swipeable } from "../Components/Swipeable";

export class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
      selectedOperation: null,
      page: 1,
      searchField: 0,
      searchTerm: ""
    };
  }

  // Number of items per page
  vol = 5;

  OPERATIONS = {
    ADJUST: "adjust",
    DELETE: "delete"
  };

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

  setSearchTerm = term => this.setState({ searchTerm: term });

  row = data => {
    return (
      <Swipeable
        key={data[0]}
        className="w-100 h3 flex items-center bb b--black-20"
        onRightSwipe={() =>
          this.setState({
            selectedKey: data[0],
            selectedOperation: this.OPERATIONS.ADJUST
          })
        }
        onLeftSwipe={() =>
          this.setState({
            selectedKey: data[0],
            selectedOperation: this.OPERATIONS.DELETE
          })
        }
        onNeutral={() =>
          this.setState({ selectedKey: null, selectedOperation: null })
        }
      >
        <div className="w-50 tc">{data[0]}</div>

        <div className="w-50 flex justify-around items-center">
          {this.state.selectedKey !== data[0] && (
            <span className="">{data[1]}</span>
          )}
          {this.state.selectedKey === data[0] &&
            this.state.selectedOperation === this.OPERATIONS.DELETE && (
              <button
                className="w-80 h2 br2 bn bg-dark-red white b"
                onClick={() => this.onClickDelete(data[0])}
              >
                Delete
              </button>
            )}
          {this.state.selectedKey === data[0] &&
            this.state.selectedOperation === this.OPERATIONS.ADJUST && (
              <React.Fragment>
                <button
                  className="bn bg-white f3 b"
                  onClick={() => this.onCountChange(data, 1)}
                >
                  +
                </button>
                <span>{data[1]}</span>
                <button
                  className={
                    "bn bg-white f3 b" + (data[1] < 2 ? " hidden" : "")
                  }
                  onClick={() => this.onCountChange(data, -1)}
                >
                  -
                </button>
              </React.Fragment>
            )}
        </div>
      </Swipeable>
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
        <div className="w-100 flex-column">
          <div className="w-100 h2 flex items-center bg-light-gray">
            <div className="w-50 tc f5 b">UPC</div>
            <div className="w-50 tc f5 b">Quantity</div>
          </div>

          {viewableList.map(tuple => this.row(tuple))}
        </div>

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
