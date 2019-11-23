import React, { PureComponent } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Vibration
} from "react-native";
import AnimatedLayout from "./Layout";
import AnimatedTimer from "./AnimatedTimer";
import { POMODORO_MODES, POMODORO_CICLES } from "../../Helpers/Constants";
import CustomTimerFormModal from "../CustomTimerModalForm";

export default class Timer extends PureComponent {
  interval;

  state = {
    isTimerStarted: false,
    cicle: 0,
    pomodoroModes: POMODORO_MODES,
    defaultTimer: POMODORO_MODES.work.timer,
    timer: POMODORO_MODES.work.timer,
    mode: POMODORO_MODES.work.id,
    isModalVisible: false
  };

  onCustomTimerSubmit = customModes => {
    this.setState({
      pomodoroModes: customModes,
      isTimerStarted: false,
      cicle: 0,
      defaultTimer: customModes.work.timer,
      timer: customModes.work.timer,
      mode: customModes.work.id
    });
  };

  pauseTimer = () => {
    this.setState({
      isTimerStarted: false
    });

    this.interval = clearInterval(this.interval);
  };

  startTimer = () => {
    const { pomodoroModes } = this.state;

    this.setState({
      isTimerStarted: true
    });

    this.interval = setInterval(() => {
      if (this.state.timer === 1) {
        this.setState({
          cicle: this.state.cicle === 7 ? 0 : this.state.cicle + 1
        });
        // Vibration.vibrate([500, 500, 500]);
        this.changeMode();
        return;
      }

      this.setState({
        timer: this.state.timer - 1
      });
    }, 1000);
  };

  resetTimer = () => {
    this.setState({
      timer: this.state.defaultTimer,
      isTimerStarted: false
    });

    clearInterval(this.interval);
  };

  changeMode = () => {
    const { pomodoroModes } = this.state;

    this.setState({
      isTimerStarted: false,
      mode: pomodoroModes[POMODORO_CICLES[this.state.cicle]].id,
      defaultTimer: pomodoroModes[POMODORO_CICLES[this.state.cicle]].timer,
      timer: pomodoroModes[POMODORO_CICLES[this.state.cicle]].timer
    });

    clearInterval(this.interval);
  };

  handleModalClose = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {
    if (!this.state.timer) return <View />;

    return (
      <AnimatedLayout
        isTimerStarted={this.state.isTimerStarted}
        mode={this.state.mode}
      >
        <AnimatedTimer
          isTimerStarted={this.state.isTimerStarted}
          cicle={this.state.cicle}
          timer={this.state.timer}
          mode={this.state.mode}
        />
        <View style={styles.btnContainer}>
          <Button
            color={this.state.isTimerStarted ? "#ececec" : "#F3FFBD"}
            disabled={this.state.isTimerStarted}
            onPress={this.startTimer}
            title="Start"
          />
          <Button color={"#F3FFBD"} onPress={this.pauseTimer} title="Pause" />
          <Button color={"#F3FFBD"} onPress={this.resetTimer} title="Reset" />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <Text style={styles.txt}>Whant to set your custom timer?</Text>
          <TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={[styles.txt, { textDecorationLine: "underline" }]}>
              Press here
            </Text>
          </TouchableOpacity>
        </View>
        <CustomTimerFormModal
          handleClose={this.handleModalClose}
          visible={this.state.isModalVisible}
          customTimerSubmit={this.onCustomTimerSubmit}
        />
      </AnimatedLayout>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    color: "#F3FFBD"
  },
  btnContainer: {
    // width: "60%",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  btn: {
    color: "#F3FFBD"
  }
});
