import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Import App Center Crashes at the top of the file.
// import Crashes from "appcenter-crashes";

// Crashes.generateTestCrash();

AppRegistry.registerComponent(appName, () => App);
