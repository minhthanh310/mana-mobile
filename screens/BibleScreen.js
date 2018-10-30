import React from "react";
import { StyleSheet, WebView, View } from "react-native";
import * as config from "../config";

export default class BibleScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: `http://${config.hosts.mana}/7-2` }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
