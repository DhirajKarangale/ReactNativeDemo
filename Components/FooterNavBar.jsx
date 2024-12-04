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

// Create your own custom icon component
const CustomIcon = ({ focused, iconName }) => {
    return (
        <Image
            source={iconName}  // You can set dynamic source based on the iconName or condition
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
            <Tab.Navigator>
                <Tab.Screen
                    name="HomePage"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={[focused ? styles.iconContainerFocused : styles.iconContainer]}>
                                <CustomIcon
                                    focused={focused}
                                    iconName={require('./icon1.png')}  // Add your custom icon path here
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (<Text style={[focused ? styles.lableFocused : styles.lable]}>Home</Text>),
                    }}
                />
                <Tab.Screen
                    name="WebView"
                    component={MWebView1}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={[focused ? styles.iconContainerFocused : styles.iconContainer]}>
                                <CustomIcon
                                    focused={focused}
                                    iconName={require('./icon2.png')}  // Add your custom icon path here
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused, color }) => (<Text style={[focused ? styles.lableFocused : styles.lable]}>WebView</Text>),
                    }}
                />
                {/* Add more screens with your custom icons here */}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
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
        height: 60,
        padding: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: 25,
        height: 25,
    },

    iconFocused: {
        width: 30,
        height: 30,
    },

    lable: {
        padding: 0,
        margin: 0,
        color: '#5A5A5A',
        fontWeight: 'normal',
    },

    lableFocused: {
        color: '#000000',
        fontWeight: '900',
        padding: 0,
        margin: 0,
        transform: [{ translateY: -10 }],
    }
});

export default FooterNavBar;