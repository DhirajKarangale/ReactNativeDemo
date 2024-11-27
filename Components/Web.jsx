import React from 'react';
import WebView from 'react-native-webview';

function Web() {
    return (
        <WebView
            source={{ uri: 'http://192.168.0.8:3000' }}
            accessibilityLabel="This is webview, React native"
            accessible={true}
        />
    );
}

export default Web;