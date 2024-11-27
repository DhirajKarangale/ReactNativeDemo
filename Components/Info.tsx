import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Info: React.FC = () => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            accessible={true}
            accessibilityLabel="Info Screen"
            accessibilityHint="Provides information about Accessibility, WebView, and Deep Linking."
        >
            <Text
                style={styles.title}
                accessibilityRole="header"
                accessible={true}
                accessibilityLabel="Info Screen"
            >
                Info
            </Text>

            <View
                style={styles.infoContainer}
                accessible={true}
                accessibilityLabel="Accessibility and WebView overview section"
                accessibilityHint="Read a brief introduction about Accessibility and WebView."
            >
                <Text style={styles.infoHeader} accessibilityRole="header">
                    Accessibility & WebView
                </Text>
                <Text
                    style={styles.infoText}
                    accessible={true}
                    accessibilityLabel="React Native Accessibility features"
                    accessibilityHint="Information about React Native accessibility features like screen reader support."
                >
                    React Native provides several accessibility features to enhance app usability for users with disabilities. These include screen reader support, focus management, and color contrast adjustments.
                </Text>
                <Text
                    style={styles.infoText}
                    accessible={true}
                    accessibilityLabel="WebView in React Native"
                    accessibilityHint="Information about using WebView to embed web content in the app."
                >
                    WebView allows embedding web pages directly in your app. It supports navigation, JavaScript execution, and communication with the app, making it a versatile tool for displaying web content.
                </Text>
            </View>

            <View
                style={styles.infoContainer}
                accessible={true}
                accessibilityLabel="Deep Linking overview section"
                accessibilityHint="Learn about Deep Linking in React Native."
            >
                <Text style={styles.infoHeader} accessibilityRole="header">
                    Deep Linking
                </Text>
                <Text
                    style={styles.infoText}
                    accessible={true}
                    accessibilityLabel="Explanation of Deep Linking in React Native"
                    accessibilityHint="Learn what Deep Linking is and how it works in React Native."
                >
                    Deep Linking enables your app to open specific content from another app, website, or external source using a URL. In React Native, deep linking is managed using the `Linking` API, which listens for incoming deep links and navigates the app to the specified screen.
                </Text>
                <Text
                    style={styles.infoText}
                    accessible={true}
                    accessibilityLabel="Deep Linking Commands"
                    accessibilityHint="Below are the deep linking commands for various use cases."
                >
                    Below are the deep linking commands for different use cases:
                </Text>

                <Text
                    style={styles.infoText}
                    accessible={true}
                    accessibilityLabel="Open App from Another App command"
                    accessibilityHint="Opens the app from another app using a custom URL scheme."
                >
                    <Text style={styles.highlight}>Open App from Another App:</Text> {'\n'}
                    <Text style={styles.code}>Linking.openURL('demo://info');</Text>
                </Text>

                <Text
                    style={styles.infoText}
                    accessible={true}
                    accessibilityLabel="Open App from Terminal (Android) command"
                    accessibilityHint="Opens the app from the terminal using the Android intent command."
                >
                    <Text style={styles.highlight}>Open App from Terminal (Android):</Text> {'\n'}
                    <Text style={styles.code}>adb shell am start -W -a android.intent.action.VIEW -d "demo://info" com.demo</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4caf50',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    infoContainer: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#e8f5e9',
        width: '90%',
        marginTop: 20,
        alignItems: 'center',
    },
    infoHeader: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#388e3c',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        lineHeight: 20,
        textAlign: 'left',
    },
    highlight: {
        fontWeight: 'bold',
        color: '#388e3c',
    },
    code: {
        fontFamily: 'monospace',
        color: '#d32f2f',
    },
});

export default Info;