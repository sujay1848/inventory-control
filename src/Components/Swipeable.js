import React, { Component } from "react";

export class Swipeable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.POSITIONS.NEUTRAL
    };
    this.x = 0;
    this.y = 0;
  }

  POSITIONS = {
    RIGHT: "right",
    LEFT: "left",
    NEUTRAL: "neutral"
  };

  onTouchStart = event => {
    this.x = event.touches[0].clientX;
    this.y = event.touches[0].clientY;
  };

  onTouchMove = event => {
    let x = event.touches[0].clientX;
    if (x - this.x > 80) {
      this.x = x;
      if (this.state.position === this.POSITIONS.NEUTRAL) {
        this.setState(
          { position: this.POSITIONS.RIGHT },
          this.props.onRightSwipe
        );
      } else if (this.state.position === this.POSITIONS.LEFT) {
        this.setState(
          { position: this.POSITIONS.NEUTRAL },
          this.props.onNeutral
        );
      }
    } else if (x - this.x < -80) {
      this.x = x;
      if (this.state.position === this.POSITIONS.NEUTRAL) {
        this.setState(
          { position: this.POSITIONS.LEFT },
          this.props.onLeftSwipe
        );
      } else if (this.state.position === this.POSITIONS.RIGHT) {
        this.setState(
          { position: this.POSITIONS.NEUTRAL },
          this.props.onNeutral
        );
      }
    }
  };

  render() {
    return (
      <div
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}
