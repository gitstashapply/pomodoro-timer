import React, { PureComponent } from "react";
import { Animated } from "react-native";
import { setColor } from "../../Helpers/ColorsHelpers";

export default class Layout extends PureComponent {
  state = {
    primaryColor: undefined
  };

  componentDidMount = () => {
    this.setBackgroundColors();
  };

  componentDidUpdate = prevProps => {
    if (this.props.mode !== prevProps.mode) {
      this.setBackgroundColors();
    }
  };

  setBackgroundColors = () => {
    const colors = setColor(this.props.mode);

    this.setState({
      primaryColor: colors.primaryColor,
      secondaryColor: colors.secondaryColor
    });
  };

  render() {
    const { primaryColor } = this.state;

    return (
      <Animated.View
        style={{
          flex: 1,
          padding: 24,
          width: "100%",
          height: "100%",
          backgroundColor: primaryColor,
          justifyContent: "space-between"
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
