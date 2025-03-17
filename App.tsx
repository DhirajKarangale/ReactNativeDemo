import React, { useState, useEffect } from 'react';
import { View, Button, NativeModules, NativeEventEmitter } from 'react-native';

const { WebViewModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(WebViewModule);

const App = () => {
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);

  const openWebView = () => {
    WebViewModule.showWebView('https://192.168.1.114:1337/test');
    setIsWebViewOpen(true);  // ✅ Hide button when WebView opens
  };

  useEffect(() => {
    const subscription = eventEmitter.addListener('onWebViewClosed', () => {
      setIsWebViewOpen(false);  // ✅ Show button when WebView closes
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!isWebViewOpen && ( // ✅ Show button only if WebView is hidden
        <Button title="Open WebView" onPress={openWebView} />
      )}
    </View>
  );
};

export default App;
