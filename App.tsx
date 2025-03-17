import React from 'react';
import TabNavigator from './Components/TabNavigator';

import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Button, NativeModules, NativeEventEmitter } from 'react-native';
import WebView from 'react-native-webview';
const { WebViewModule } = NativeModules;


const { LogixPlayerModule, ScreenOrientation, VideoQualityModule } = NativeModules;
const logixPlayerEmitter = new NativeEventEmitter(WebViewModule);

export default function App(): React.JSX.Element {
  return (
    <>

      <View style={{marginTop : 100}}>
        <Button title="Show WebView 1" onPress={() => {
          console.log("Btn");
          
          logixPlayerEmitter.addListener("showWebView", () => {
            console.log("=================== Lister showWebView");
          });
        }
        } />
      </View>

    </>
  );
}