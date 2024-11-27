import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';

const Home: React.FC = () => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            accessible={true}
        >
            <Text
                style={styles.title}
                accessibilityRole="header"
                accessible={true}
                accessibilityLabel="Home Screen"
            >
                Home
            </Text>

            <Text
                style={styles.description}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel="App demo description"
            >
                This app is a demo built with React Native, showcasing features like deep linking, accessibility, and WebView integration.
            </Text>

            <Text
                style={styles.description}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel="React Native Overview"
            >
                React Native allows developers to build cross-platform mobile apps using JavaScript and React, ensuring a smooth experience on both iOS and Android.
            </Text>

            <Text
                style={styles.description}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel="Deep Linking Explanation"
            >
                Deep linking enables users to directly access specific screens in the app via a URL, such as `demo://info` to open the info screen.
            </Text>

            <Text
                style={styles.description}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel="Accessibility Features"
            >
                Accessibility features, such as screen readers and adjustable fonts, ensure the app is usable by everyone, including people with disabilities.
            </Text>

            <Text
                style={styles.description}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel="WebView Overview"
            >
                WebView lets you display web content within the app, allowing integration of HTML, CSS, and JavaScript-based elements directly in the mobile app.
            </Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 30,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 19,
        color: '#555',
        marginBottom: 15,
        lineHeight: 24,
        textAlign: 'center',
    },
});

export default Home;