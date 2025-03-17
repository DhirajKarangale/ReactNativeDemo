import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Web from './Web';
import Home from './Home';
import Info from './Info';
import Lic from './Lic';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const [initialRoute, setInitialRoute] = useState('Home');

    async function checkDeepLink() {
        const url = await Linking.getInitialURL();
        if (url) {
            const route = url.replace('demo://', '');
            setInitialRoute(route.charAt(0).toUpperCase() + route.slice(1));
        }
    };

    function handleLinking({ url }: { url: string }) {
        const route = url.replace('demo://', '');
        setInitialRoute(route.charAt(0).toUpperCase() + route.slice(1));
    };

    useEffect(() => {
        checkDeepLink();
        const subscription = Linking.addEventListener('url', handleLinking);
        return () => { subscription.remove(); };
    }, []);

    const linking = {
        prefixes: ['demo://'],
        config: {
            screens: {
                Home: 'home',
                WebView: 'webview',
                Info: 'info',
                Lic: 'Lic'
            },
        },
    };

    return (
        <NavigationContainer linking={linking}>
            <Tab.Navigator
                initialRouteName={initialRoute}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch (route.name) {
                            case 'Home':
                                iconName = focused ? 'home' : 'home-outline';
                                break;
                            case 'WebView':
                                iconName = focused ? 'add-circle' : 'add-circle-outline';
                                break;
                            case 'Info':
                                iconName = focused ? 'settings' : 'settings-outline';
                                break;
                            case 'Lic':
                                iconName = focused ? 'information-circle' : 'information-circle-outline';
                                break;
                            default:
                                iconName = 'home-outline';
                        }

                        return (
                            <View
                                style={focused ? styles.iconContainerFocused : styles.iconContainer}>
                                <Icon
                                    style={focused ? styles.iconFocused : styles.icon}
                                    name={iconName}
                                    size={focused ? 30 : 25}
                                    color={color}
                                />
                            </View>
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={focused ? styles.labelFocused : styles.label}>
                                {route.name}
                            </Text>
                        );
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#5A5A5A',
                    tabBarStyle: { height: 70 },
                    headerShown: false,
                })}>

                <Tab.Screen name="Info" component={Info} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="WebView" component={Info} />
                <Tab.Screen name="Lic" component={Lic} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    iconContainerFocused: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a7ffa2',
        transform: [{ translateY: -10 }],
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#4caf50',
    },
    iconFocused: {
        color: '#000',
    },
    label: {
        color: '#5A5A5A',
        fontSize: 12,
    },
    labelFocused: {
        color: '#4caf50',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TabNavigator;