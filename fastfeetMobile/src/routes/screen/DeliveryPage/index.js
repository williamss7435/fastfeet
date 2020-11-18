import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DeliveriesPage from '../../../pages/DeliveriesPage';
import DeliveryDetailPage from '../../../pages/DeliveryDetailPage';
import DeliveryProblemPage from '../../../pages/DeliveryProblemPage';
import DeliveryProblemListPage from '../../../pages/DeliveryProblemListPage';
import DeliveryConfirmPage from '../../../pages/DeliveryConfirmPage';

export default function DeliveryPage({navigation}) {
    const {Navigator, Screen} = createStackNavigator();

    return (
        <Navigator>
            <Screen
                name="DeliveriesPage"
                component={DeliveriesPage}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="DeliveryDetailPage"
                component={DeliveryDetailPage}
                options={{
                    title: 'Detalhes da encomenda',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('DeliveriesPage')
                            }>
                            <Icon
                                name="keyboard-arrow-left"
                                size={25}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },
                }}
            />
            <Screen
                name="DeliveryProblemPage"
                component={DeliveryProblemPage}
                options={{
                    title: 'Informar problema',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('DeliveryDetailPage')
                            }>
                            <Icon
                                name="keyboard-arrow-left"
                                size={25}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Screen
                name="DeliveryProblemListPage"
                component={DeliveryProblemListPage}
                options={{
                    title: 'Visualizar problemas',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',

                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('DeliveryDetailPage')
                            }>
                            <Icon
                                name="keyboard-arrow-left"
                                size={25}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Screen
                name="DeliveryConfirmPage"
                component={DeliveryConfirmPage}
                options={{
                    title: 'Confirmar entrega',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',

                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('DeliveryDetailPage')
                            }>
                            <Icon
                                name="keyboard-arrow-left"
                                size={25}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Navigator>
    );
}
