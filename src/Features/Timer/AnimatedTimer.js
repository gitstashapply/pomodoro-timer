import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Animated, resetAnimation } from "react-native";
import { POMODORO_MODES, POMODORO_CICLES } from "../../Helpers/Constants";
import { convertMillisToString } from "../../Helpers/TimeHelper";
import { setColor } from "../../Helpers/ColorsHelpers";

const animation = new Animated.Value(0);

export default class AnimatedTimer extends PureComponent {
  componentDidUpdate = prevProps => {
    const _animation = Animated.loop(
      Animated.timing(animation, {
        toValue: 600,
        duration: 2000
      }),
      {
        iterations: "infinite"
      }
    );

    if (this.props.isTimerStarted && !prevProps.isTimerStarted) {
      _animation.start();
    }

    if (!this.props.isTimerStarted && prevProps.isTimerStarted) {
      _animation.stop();
      animation.setValue(0);
    }
  };

  render() {
    const opacity = animation.interpolate({
      inputRange: [0, 300, 600],
      outputRange: [0.5, 0.3, 0]
    });

    const opacity1 = animation.interpolate({
      inputRange: [0, 300, 600],
      outputRange: [1, 0, 1]
    });

    const scale = animation.interpolate({
      inputRange: [0, 300, 600],
      outputRange: [1, 1.1, 1.3]
    });

    const scale1 = animation.interpolate({
      inputRange: [0, 300, 600],
      outputRange: [1, 1.2, 1.4]
    });

    const scale2 = animation.interpolate({
      inputRange: [0, 300, 600],
      outputRange: [1, 1.07, 1.25]
    });

    return (
      <View style={styles.container}>
        <Text style={styles.txt}>
          Cicle: {POMODORO_MODES[POMODORO_CICLES[this.props.cicle]].title}
        </Text>
        <Animated.View
          style={{
            height: 200,
            width: 200,
            position: "absolute",
            top: "25%",
            flex: 1,
            backgroundColor: setColor(this.props.mode).primaryColor,
            zIndex: 999,
            borderRadius: 100,
            borderWidth: !this.props.isTimerStarted ? 1 : 0,
            borderColor: "#F3FFBD",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={[styles.txt, styles.timer]}>
            {convertMillisToString(this.props.timer)}
          </Text>
        </Animated.View>
        <SplashView opacity={opacity} scale={scale} />
        <SplashView opacity={opacity} scale={scale1} />
        <SplashView opacity={opacity} scale={scale2} />
      </View>
    );
  }
}

const SplashView = ({ opacity, scale }) => (
  <Animated.View
    style={[
      {
        opacity: opacity,
        transform: [{ scale: scale }]
      },
      styles.splashContainer
    ]}
  />
);

const styles = StyleSheet.create({
  txt: {
    color: "#F3FFBD"
  },
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  timer: {
    fontSize: 64
  },
  splashContainer: {
    height: 200,
    width: 200,
    zIndex: 0,
    top: "25%",
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#F3FFBD"
  }
});
