import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginPage from '../pages/LoginPage';
import AppScreen from './screen/AppScreen';
import {navigationRef} from './RootNavigation';
import {useSelector} from 'react-redux';

export default function RouterRoot() {
    const logged = useSelector((state) => state.user.logged);

    const {Navigator, Screen} = createStackNavigator();
    if (logged) {
        return (
            <NavigationContainer ref={navigationRef}>
                <Navigator headerMode="none" initialRouteName="App">
                    <Screen name="App" component={AppScreen} />
                </Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer ref={navigationRef}>
                <Navigator headerMode="none" initialRouteName="Login">
                    <Screen name="Login" component={LoginPage} />
                </Navigator>
            </NavigationContainer>
        );
    }
}
