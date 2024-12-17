import axios from 'axios';
import RNFS from 'react-native-fs';
import WebView from 'react-native-webview';
import Cookies from '@react-native-cookies/cookies';
import NetInfo from '@react-native-community/netinfo';
import CookieManager from '@react-native-cookies/cookies';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PermissionsAndroid, Platform } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

function Lic() {

    const [msg, setMsg] = useState("");
    const [color, setColor] = useState("");
    const [webURL, setWebURL] = useState("");
    const webViewRef = useRef<WebView | null>(null);
    const screenWidth = Dimensions.get('window').width;

    const path = `${RNFS.DocumentDirectoryPath}/cached_page.html`;
    const cfClearanceToken = 's86JdkcewC5KIyioIcwnp.V0PtgcVDLey7UzrghZJSM-1733999727-1.2.1.1-0p_BXX3akcbzA1AI58qZ3HZ1XAdbhHH2xCcWvMisHHnLuf11immX008l0auo1KyBuABYPD797xbhswsoQiuiKwNvSDkCJc0wvOBOSiMjM1AMNjnpJBin2Eaua3fQQxTORzvrHhc69ptDCSKM0wPbh7RirZoiHVG9.OTddTcAlx3CfKpfHQtqZyQgW0NuadCnXgl8TOLSyL7qwcXfbSnTGyqBoCJkigSlQ_A9DE6sjHam4RJXvOD0aQkRW6JXZ3HAtKpFmXYE4epk8ER1PUAdOuJVw5i7TmIVuUF25QzKv9Ba6jP46Y29HJD5eLIRiDzHdOBUUZhNnTgGxMvvI0XNHwnBDmvODxkSi3ucrgY5PilPGKBTB9O_Hi1gIMofW5cbzAPJO9g7lBhK8o0yEkiEBA';

    const urls = [
        { name: 'New Endowment', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=AE19D8B0-0C0C-4E30-AB33-B222C374E482' },
        { name: 'Jeevan Amar', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=2DA3DE50-7A2A-4F6A-87C2-ECEDCAAA2FEF' },
        { name: 'Jeevan Akshay', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=0EB6799D-DC0E-4CAA-A8B6-0AEA3E4215E6' },
        { name: 'ULIP', url: 'https://esalesuat.licindia.in/Proposal?OpportunityId=51360223-05EB-47A1-8F7D-7929BCE1763A' },
    ];

    // useEffect(() => { requestPermission(); }, []);

    async function cache() {
        try {
            // const response = await fetch(webURL);
            const response = await fetch(webURL, {
                method: 'GET',
                credentials: 'include',
            });
            console.log(response);
            if (!response.ok) {
                console.log("Failed to fetch page");
                return;
            }
            const html = await response.text();
            let x = await RNFS.writeFile(path, html, 'utf8');
            console.log("Page cached successfully: " + x);
        } catch (error) {
            console.error("Error caching page:", error);
        }
    }

    async function requestPermission() {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'This app needs access to your storage to save files.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Storage permission granted');
                } else {
                    console.log('Storage permission denied');
                }
            }
        } catch (err) {
            console.warn("Permission error: ", err);
        }
    }

    async function Login() {
        try {
            const response = await fetch('https://digiapiuat.licindia.in/api/Login/Authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: "infosys@gmail.com",
                    ProductType: 'Mica',
                    envId: '1',
                    Password: "Mica@123",
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                // const cfClearance = extractCfClearance(token);

                await Cookies.set('https://esalesuat.licindia.in', {
                    name: 'cf_clearance',
                    value: cfClearanceToken,
                    domain: '.licindia.in',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                });

                CookieManager.setFromResponse('https://esalesuat.licindia.in', cfClearanceToken)
                    .then(() => {
                        console.log('Cookie set successfully');
                    })
                    .catch(error => {
                        console.error('Failed to set cookie:', error);
                    });

                if (webViewRef.current) {
                    const cookieScript = `
                  document.cookie = "cf_clearance=${cfClearanceToken}; path=/; domain=.licindia.in;";
                `;
                    webViewRef.current.injectJavaScript(cookieScript);
                }

                SetMsg('Login successful', 'green');
            } else {
                SetMsg('Login failed. Please try again.', 'red');
            }
        } catch (error) {
            console.error('Error during login:', error);
            SetMsg('Error during login', 'red');
        }
    }

    async function SetWebURL(url: string) {

        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
            setWebURL(url);
        } else {
            const exists = await RNFS.exists(path);
            if (exists) {
                setWebURL(`file://${path}`);
            } else {
                setWebURL("");
                console.log("No cached data available");
            }
        }
    }

    function SetMsg(msg: string, color: string) {
        setColor(color);
        setMsg(msg);
        setTimeout(() => { setMsg(""); }, 3000);
    }

    if (!webURL) {
        return (
            <View style={styles.container}>

                {msg ? (
                    <Text style={[styles.messageText, { color: color }]}>{msg}</Text>
                ) : null}


                <View style={styles.buttonContainer}>
                    {urls.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.button, { width: screenWidth * 0.6 }]}
                            onPress={() => SetWebURL(item.url)}
                        >
                            <Text style={styles.buttonText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={Login}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => SetWebURL('')} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <WebView
                ref={webViewRef}
                source={{ uri: webURL }}
                accessibilityLabel="This is webview, React native"
                accessible={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
                cacheEnabled={true}
                startInLoadingState={true}
                onLoadStart={() => {

                    setTimeout(() => { cache(); }, 5000);

                    if (webViewRef.current) {
                        const cookieScript = `
                        document.cookie = "cf_clearance=${cfClearanceToken}; path=/; domain=.licindia.in;";
                    `;
                        webViewRef.current.injectJavaScript(cookieScript);
                    }
                }}
                injectedJavaScript={`
                (function() {
                    document.cookie = "cf_clearance=${cfClearanceToken}; path=/; domain=.licindia.in;";
                })();
            `}
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
    loginButton: {
        backgroundColor: '#388E3C',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    loginButtonText: {
        fontSize: 18,
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