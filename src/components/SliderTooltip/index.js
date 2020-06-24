import React, { Fragment } from "react";
import Slider from "rc-slider";

const sliderHandle = (props) => {
  const { value, dragging, index, offset, ...restProps } = props;
  const positionStyle = {
    position: "absolute",
    left: `${offset}%`,
    display: "none",
  };
  return (
    <Fragment key={index}>
      <div className="rc-slider-tooltip" style={positionStyle}>
        {"$" + value}
      </div>
      <Slider.Handle value={value} offset={offset} {...restProps} />
    </Fragment>
  );
};

export class SliderTooltip extends React.Component {
  render() {
    return (
      <Slider handle={this.props.handle || sliderHandle} {...this.props} />
    );
  }
}
