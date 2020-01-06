import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { setFixture, scanSkus } from "../StateManagement/Actions";
import { EditableTable } from "./EditableTable";
import { saveStocktake } from "../ControllerInteface/ApiCaller";
import Swal from "sweetalert2";

const mapStateToProps = state => {
  return {
    fixtureId: state.fixtureId,
    skuCountList: state.skuCountList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSkuCountList: skuCountList => dispatch(scanSkus(skuCountList)),
    setFixtureId: fixtureId => dispatch(setFixture(fixtureId))
  };
};

export class ConnectedReviewPage extends Component {
  clearState = () => {
    this.props.setSkuCountList({ skuCountList: {} });
    this.props.setFixtureId({ fixtureId: null });
  };

  // First popup for submission confirmation
  onClickSubmit = () => {
    Swal.fire({
      title: "Submission",
      text: "Enter your employee ID",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCloseButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: this.onClickSubmitEmployeeId,
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        this.onSuccessSubmission();
      }
    });
  };

  onClickSubmitEmployeeId = userid => {
    let { fixtureId, skuCountList } = this.props;
    return saveStocktake(
      userid,
      fixtureId,
      skuCountList,
      () => {},
      err => Swal.showValidationMessage(`${err}`)
    );
  };

  onSuccessSubmission = () => {
    Swal.fire({
      title: "Successful!",
      text: "The records has been submitted.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Start New Count",
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(result => {
      if (result.value) {
        // Link to count start page by clearing all scanned records
        this.clearState();
      }
    });
  };

  disableButton = () =>
    !this.props.skuCountList ||
    Object.entries(this.props.skuCountList).length === 0;

  render() {
    if (!this.props.fixtureId) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <div className="flex flex-column ma3">
          <div className="flex ma2">
            <span className="f4 mr2">FIXTURE ID:</span>
            <span className="underline f4">{this.props.fixtureId}</span>
          </div>
          <div>
            <EditableTable
              skuCountList={this.props.skuCountList}
              setSkuCountList={this.props.setSkuCountList}
            />
          </div>
          <div className="flex flex-column">
            <button
              className={
                "w-100 f5 b white bw0 h2 br2" +
                (this.disableButton() ? "" : " bg-blue")
              }
              disabled={this.disableButton()}
              onClick={this.onClickSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const ScanPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedReviewPage);
export default ScanPage;
