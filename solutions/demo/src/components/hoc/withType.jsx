import React from "react";
import PropTypes from "prop-types";

const withType = (WrappedComp) => {
  class WrapperComponent extends React.Component {
    componentDidMount() {
      const { type } = this.props;
      console.log(`Input of ${type} is mounted!`);
    }

    render() {
      const { forwaredRef } = this.props;
      return <WrappedComp {...this.props} ref={forwaredRef} />;
    }
  }
  WrapperComponent.propTypes = {
    type: PropTypes.string,
    forwaredRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(PropTypes.elementType),
    ]),
  };
  WrapperComponent.defaultProps = {
    type: "text",
    forwaredRef: () => {},
  };

  return React.forwardRef((props, ref) => {
    return <WrapperComponent forwaredRef={ref} {...props} />;
  });
};

export default withType;
