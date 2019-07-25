import React, { Component } from "react";
import { View } from "react-native";

export default class GoingToCrash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foo: "bar"
    };
  }

  componentDidMount() {
    this.setState({ foo: "stackoverflow" });
  }

  componentDidUpdate() {
    this.setState({ foo: "stackoverflow" });
  }

  render() {
    return <View />;
  }
}
