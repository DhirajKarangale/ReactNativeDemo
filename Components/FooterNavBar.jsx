import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import WebView from 'react-native-webview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MWebView1 = () => {
    return <WebView source={{ uri: 'https://www.google.com' }} />;
};

const CustomIcon = ({ focused, iconName }) => {
    return (
        <Image
            source={iconName}
            style={[styles.icon, focused ? styles.iconFocused : styles.icon]}
        />
    );
};

const SettingsScreen = () => {
    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
};

const BuyOnlineScreen = () => {
    return (
        <View>
            <Text>BuyOnlineScreen</Text>
        </View>
    );
};

const Home = () => {
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

const Login = () => {
    return (
        <View>
            <Text>Login</Text>
        </View>
    );
};

const BuyOnline = () => {
    return (
        <View>
            <Text>BuyOnline</Text>
        </View>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Pay Premium "
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BuyOnlineScreen"
                component={BuyOnlineScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const FooterNavBar = () => {
    return (
        <NavigationContainer>

            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: {
                        height: 80, 
                        backgroundColor: '#f8f8f8',
                        paddingBottom: 10, 
                        paddingTop: 10,
                    },
                }}
            >
                <Tab.Screen
                    name="Buy Online"
                    component={BuyOnline}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    focused ? styles.iconContainerFocused : styles.iconContainer,
                                ]}>
                                <Image
                                    style={[
                                        focused ? styles.iconFocused : styles.icon,
                                        { width: size, height: size },
                                    ]}
                                    source={require('./icon1.png')}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={[focused ? styles.lableFocused : styles.lable]}>
                                Buy Online
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Service Hub"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    focused ? styles.iconContainerFocused : styles.iconContainer,
                                ]}>
                                <Image
                                    style={[
                                        focused ? styles.iconFocused : styles.icon,
                                        { width: size, height: size },
                                    ]}
                                    source={require('./icon2.png')}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={[focused ? styles.lableFocused : styles.lable]}>
                                Service Hub
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    focused ? styles.iconContainerFocused : styles.iconContainer,
                                ]}>
                                <Image
                                    style={[
                                        focused ? styles.iconFocused : styles.icon,
                                        { width: size, height: size },
                                    ]}
                                    source={require('./icon1.png')}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={[focused ? styles.lableFocused : styles.lable]}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Pay Premium"
                    component={Login}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    focused ? styles.iconContainerFocused : styles.iconContainer,
                                ]}>
                                <Image
                                    style={[
                                        focused ? styles.iconFocused : styles.icon,
                                        { width: size, height: size },
                                    ]}
                                    source={require('./icon2.png')}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={[focused ? styles.lableFocused : styles.lable]}>
                                Pay Premium
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="My LIC"
                    component={SettingsScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    focused ? styles.iconContainerFocused : styles.iconContainer,
                                ]}>
                                <Image
                                    style={[
                                        focused ? styles.iconFocused : styles.icon,
                                        { width: size, height: size },
                                    ]}
                                    source={require('./icon1.png')}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={[focused ? styles.lableFocused : styles.lable]}>
                                My LIC
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>

        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
    },

    iconContainerFocused: {
        width: 60,
        height: 60,
        margin: 0,
        padding: 0,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCC300',
        transform: [{ translateY: -30 }],
    },

    iconContainer: {
        width: 60,
        height: 100,
        padding: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: 25,
        height: 60,
    },

    iconFocused: {
        width: 30,
        height: 60,
    },

    lable: {
        padding: 0,
        margin: 0,
        color: '#5A5A5A',
        fontWeight: 'normal',
        textAlign: 'center'
    },

    lableFocused: {
        color: '#000000',
        fontWeight: '900',
        padding: 0,
        margin: 0,
        transform: [{ translateY: -10 }],
    },
});

export default FooterNavBar;