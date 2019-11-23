import React, { PureComponent } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

const TextInputRow = ({ title, value, onChange, id }) => (
  <View style={styles.textInputRow}>
    <Text style={[styles.txt, { marginVertical: 16, fontSize: 24 }]}>
      {title}
    </Text>
    <View style={{ flexDirection: "row" }}>
      <TextInput
        value={value}
        onChangeText={value => {
          onChange(value, id);
        }}
        keyboardType={"numeric"}
        style={styles.txtInput}
      />
      <Text style={[styles.txt, { alignSelf: "center", marginHorizontal: 24 }]}>
        MINS
      </Text>
    </View>
  </View>
);

export default class CustomTimerFormModal extends PureComponent {
  state = {
    wt: undefined,
    sb: undefined,
    lb: undefined
  };

  handleInputChange = (value, id) => {
    this.setState({
      [id]: value
    });
  };

  handleSubmit = () => {
    const { wt, sb, lb } = this.state;

    const customMode = {
      longBreak: { id: "longBreak", timer: lb * 60, title: "Long break" },
      work: { id: "work", timer: wt * 60, title: "Work" },
      break: { id: "break", timer: sb * 60, title: "Break" }
    };

    this.props.customTimerSubmit(customMode);
    this.props.handleClose();
  };

  render() {
    const { wt, sb, lb } = this.state;
    const btnDisabled = !wt || !sb || !lb;

    return (
      <Modal visible={this.props.visible} animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 40,
                right: 16,
                alignSelf: "flex-end"
              }}
              onPress={this.props.handleClose}
            >
              <Text style={{ color: "#F3FFBD" }}>CLOSE</Text>
            </TouchableOpacity>
            <Text style={[styles.txt, { fontSize: 24 }]}>
              Want to set your custom timer?
            </Text>
            <View style={styles.formContainer}>
              <TextInputRow
                onChange={this.handleInputChange}
                value={wt}
                id={"wt"}
                title={"WORK TIME"}
              />
              <TextInputRow
                onChange={this.handleInputChange}
                value={sb}
                id={"sb"}
                title={"SHORT BREAK"}
              />
              <TextInputRow
                onChange={this.handleInputChange}
                value={lb}
                id={"lb"}
                title={"LONG BREAK"}
              />
            </View>
            <View style={{ height: 40, width: "100%" }}>
              <TouchableOpacity
                disabled={btnDisabled}
                style={{
                  flex: 2,
                  borderWidth: 2,
                  borderColor: btnDisabled ? "#cecece" : "#F3FFBD",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={this.handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: btnDisabled ? "#cecece" : "#F3FFBD"
                  }}
                >
                  APPLY
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#8acbbf",
    alignItems: "center",
    justifyContent: "space-around"
  },
  txt: {
    color: "#F3FFBD"
  },
  formContainer: {
    height: "40%",
    width: "100%",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  txtInput: {
    height: 60,
    width: 60,
    borderWidth: 1,
    color: "#F3FFBD",
    borderColor: "#F3FFBD",
    fontSize: 24,
    fontWeight: "bold",
    padding: 20
  },
  textInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    justifyContent: "space-between"
  }
});
