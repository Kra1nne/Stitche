import { styled } from "nativewind";
import React, { Component } from "react";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export class index extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text> List of Item </Text>
      </SafeAreaView>
    );
  }
}

export default index;
