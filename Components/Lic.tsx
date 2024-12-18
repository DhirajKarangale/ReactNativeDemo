import WebView from 'react-native-webview';
import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

function Lic() {

    const [webURL, setWebURL] = useState("");
    const screenWidth = Dimensions.get('window').width;

    const webViewRef = useRef<WebView>(null);
    const { isConnected } = useNetInfo();
    const [localPage, setLocalPage] = useState<string>('<h1>Loading...</h1>');

    const urls = [
        { name: 'New Endowment', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=AE19D8B0-0C0C-4E30-AB33-B222C374E482' },
        { name: 'Jeevan Amar', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=2DA3DE50-7A2A-4F6A-87C2-ECEDCAAA2FEF' },
        { name: 'Jeevan Akshay', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=0EB6799D-DC0E-4CAA-A8B6-0AEA3E4215E6' },
        { name: 'ULIP', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=51360223-05EB-47A1-8F7D-7929BCE1763A' },
    ];

    async function storedPage(url: string, htmlContent: string) {
        if (!url || !htmlContent) return;

        try {
            const existingData = await AsyncStorage.getItem(url);
            if (existingData !== null) {
                // console.log(`Removing old data for URL: ${url}`);
                await AsyncStorage.removeItem(url);
            }
            await AsyncStorage.setItem(url, htmlContent);
            console.log("Saved - " + url + " - " + htmlContent.slice(0, 200));
        } catch (error) {
            console.log('Error saving page:', error);
        }
    }

    async function loadStoredPage(url: string) {
        if (!url) return;
        try {
            const storedContent = await AsyncStorage.getItem(url);
            if (storedContent) {
                setLocalPage(storedContent);
            }
        } catch (error) {
            console.log('Error loading offline page:', error);
        }
    }

    const handleMessage = (event: any) => {
        const htmlContent = event.nativeEvent.data;
        storedPage(webURL, htmlContent);
    };


    if (!webURL) {
        return (
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    {urls.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.button, { width: screenWidth * 0.6 }]}
                            onPress={() => {
                                loadStoredPage(item.url);
                                setWebURL(item.url);
                            }}
                        >
                            <Text style={styles.buttonText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </View >
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setWebURL('')} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <WebView
                ref={webViewRef}
                source={!isConnected ? { html: localPage } : { uri: webURL }}
                onMessage={handleMessage}
                cacheEnabled={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadEnd={() => {
                    setTimeout(() => {
                        if (webViewRef.current) {
                            webViewRef.current.injectJavaScript(`(function() {
            // Inline all CSS styles
            const styleSheets = Array.from(document.styleSheets);
            let inlineStyles = '';
            styleSheets.forEach(sheet => {
                try {
                    const rules = sheet.rules || sheet.cssRules;
                    Array.from(rules).forEach(rule => {
                        inlineStyles += rule.cssText;
                    });
                } catch (e) {
                    console.warn('Error inlining styles:', e);
                }
            });

            // Append inline styles to the page
            const styleTag = document.createElement('style');
            styleTag.textContent = inlineStyles;
            document.head.appendChild(styleTag);

            // Convert images to base64
            function toBase64(img) {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL());
                    };
                    img.onerror = reject;
                });
            }

            async function convertImagesToBase64() {
                const images = document.querySelectorAll('img');
                for (const img of images) {
                    try {
                        const base64 = await toBase64(img);
                        img.src = base64;
                    } catch (e) {
                        console.warn('Image conversion failed:', e);
                    }
                }
            }

            // Run image conversion and post modified HTML back
            convertImagesToBase64().then(() => {
                window.ReactNativeWebView.postMessage(document.documentElement.outerHTML);
            });
        })();
            `);
                        }
                    }, 5000);
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5F5E1',
        padding: 20,
    },
    buttonContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50,
    },
});

export default Lic;