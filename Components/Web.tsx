import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Button, NativeModules } from 'react-native';
import Video from 'react-native-video';
import WebView from 'react-native-webview';

const { WebViewModule } = NativeModules;

function Web() {

    const [videoUrl, setVideURL] = useState("");
    const [isBuffering, setIsBuffering] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function Msg(event: any) {
        const url = event.nativeEvent.data;
        setVideURL(url);
    }

    if (videoUrl) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={() => { setVideURL("") }}>
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>

                <Video
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    controls={true}
                    resizeMode="contain"
                    onBuffer={({ isBuffering }) => setIsBuffering(isBuffering)}
                    onError={(e) => console.error('Error:', e)}
                    onLoadStart={() => setIsLoading(true)}
                    onLoad={() => setIsLoading(false)}
                />

                {(isBuffering || isLoading) && (
                    <View style={styles.bufferingContainer}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.bufferingText}>{isLoading ? "Loading Video..." : "Buffering..."}</Text>
                    </View>
                )}
            </View>
        );
    }

    const openWebView = () => {
        WebViewModule.showWebView('https://192.168.1.114:1337/test');
      };

    return (
        <View style={{ flex: 1 }}>
            {/* <WebView
                source={{ uri: 'https://192.168.1.114:1337/test' }}
                accessibilityLabel="This is webview, React native"
                accessible={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                hardwareAcceleration={true}
                startInLoadingState={true}
                allowUniversalAccessFromFileURLs={true}
                allowFileAccessFromFileURLs={true}
                originWhitelist={['*']}
                mixedContentMode="always"
                onMessage={(event) => Msg(event)}
            /> */}

            <Text>DK Webview</Text>

            {/* <Button title="Open WebView" onPress={openWebView} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 20,
    },
    closeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    video: {
        flex: 1,
        width: '100%',
        height: 300,
    },
    bufferingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
    },
    bufferingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
});

export default Web;