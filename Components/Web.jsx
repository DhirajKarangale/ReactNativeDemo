import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import WebView from 'react-native-webview';


function Web() {

    const [videoUrl, setVideURL] = useState("");
    const [isBuffering, setIsBuffering] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function Msg(event) {
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

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'http://192.168.0.113:3000' }}
                accessibilityLabel="This is webview, React native"
                accessible={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                hardwareAcceleration={true}
                onMessage={(event) => Msg(event)}
            />
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