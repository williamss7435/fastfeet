import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DeliveriesPage from './DeliveryPage';
import ProfilePage from '../../pages/ProfilePage';

export default function AppScreen() {
    const {Navigator, Screen} = createBottomTabNavigator();

    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: '#7D40E7',
                inactiveTintColor: '#999999',
                keyboardHidesTabBar: true,
                allowFontScaling: true,
                labelStyle: {
                    fontSize: 14,
                    paddingBottom: 10,
                },
                iconStyle: {
                    marginTop: 10,
                },
                style: {
                    height: 70,
                },
            }}>
            <Screen
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Entregas',
                    tabBarIcon: ({color}) => (
                        <Icon color={color} name="reorder" size={30} />
                    ),
                }}
                name="Deliveries"
                component={DeliveriesPage}
            />
            <Screen
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Meu Perfil',
                    tabBarIcon: ({color}) => (
                        <Icon color={color} name="account-circle" size={30} />
                    ),
                }}
                name="Profile"
                component={ProfilePage}
            />
        </Navigator>
    );
}
