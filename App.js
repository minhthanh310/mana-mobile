import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Provider } from "react-redux";

import AppNavigator from "./navigation/AppNavigator";
import store from "./stores/configureStore";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        "text-italic": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-Italic.ttf"),
          android: require("./assets/fonts/android/Roboto-Italic.ttf")
        }),
        "text-light": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-Light.ttf"),
          android: require("./assets/fonts/android/Roboto-Light.ttf")
        }),
        "text-light-italic": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-LightItalic.ttf"),
          android: require("./assets/fonts/android/Roboto-LightItalic.ttf")
        }),
        "text-medium": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-Medium.ttf"),
          android: require("./assets/fonts/android/Roboto-Medium.ttf")
        }),
        "text-regular": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-Regular.ttf"),
          android: require("./assets/fonts/android/Roboto-Regular.ttf")
        }),
        "text-bold": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-Bold.ttf"),
          android: require("./assets/fonts/android/Roboto-Bold.ttf")
        }),
        "text-semibold": Platform.select({
          ios: require("./assets/fonts/ios/SF-UI-Text-Semibold.ttf"),
          android: require("./assets/fonts/android/Roboto-Bold.ttf")
        })
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
