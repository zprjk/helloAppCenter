import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Analytics from "appcenter-analytics";
import GoingToCrash from "./going-to-crash";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.onOtherOtherPressButton = this.onOtherOtherPressButton.bind(this);
  }

  componentDidMount() {
    Analytics.trackEvent("App Mounting", { Category: "App" });
  }

  componentWillUnmount() {
    Analytics.trackEvent("App Unmounting", { Category: "App" });
  }

  onPressButton() {
    Analytics.trackEvent("Clicked Crash 1", { Category: "Navigation" });

    throw this_function_does_not_exist();
  }

  onOtherPressButton() {
    Analytics.trackEvent("Clicked Crash 2", { Category: "Navigation" });

    throw new Error("This is a test javascript crash!");
  }

  onOtherOtherPressButton() {
    Analytics.trackEvent("Clicked Crash 3", { Category: "Navigation" });

    this.setState({ show: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Olá Hidepixel !!!!</Text>

        <TouchableHighlight onPress={this.onPressButton}>
          <Text style={styles.welcome}>Clicka para crashar 1 </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onOtherPressButton}>
          <Text style={styles.welcome}>Clicka para crashar 2</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onOtherOtherPressButton}>
          <Text style={styles.welcome}>Clicka para crashar 3</Text>
        </TouchableHighlight>

        {this.state.show && <GoingToCrash />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
