import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {Logout} from '../../store/modules/user/actions';
import FastFeetAPI from '../../services/FastFeetAPI';

import DeliveryCardComponent from '../../components/DeliveryCardComponent';
import {
    Container,
    ProfileBar,
    Photo,
    Profile,
    LogoutButton,
    ProfileName,
    WelcomeText,
    DeliveryMenu,
    DeliveryTitle,
    Filter,
    FilterButtonText,
    PendingButton,
    DeliveredButton,
    DeliveryList,
    DeliveryListText,
    Shimmer,
    SmallShimmer,
} from './styles';

export default function DeliveriesPage({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.user ? state.user : {}));

    const [orders, setOrders] = useState([]);
    const [ShowDelivired, SetShowDelivired] = useState(0);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            (async function getOrders() {
                setLoading(true);

                const response = await FastFeetAPI.getOrdersByDeliverymanId(
                    ShowDelivired,
                    user.id,
                );
                
                if (response.success) {
                    setOrders(response.data);
                }

                setLoading(false);
            })();
        }, [ShowDelivired, user.id]),
    );

    function handlerDetail(delivery) {
        navigation.navigate('DeliveryDetailPage', {delivery});
    }

    function handlerLogout() {
        dispatch(Logout());
    }

    return (
        <Container>
            <ProfileBar>
                <Photo
                    size={70}
                    uri={user.photo_url}
                    loading={user.name === ''}
                />
                <Profile>
                    <SmallShimmer
                        visible={user.name !== ''}
                        height={10}
                        width={110}>
                        <WelcomeText>Bem vindo de volta,</WelcomeText>
                    </SmallShimmer>
                    <Shimmer visible={user.name !== ''}>
                        <ProfileName>{user.name}</ProfileName>
                    </Shimmer>
                </Profile>
                <LogoutButton onPress={handlerLogout}>
                    <Icon name="exit-to-app" color="#E74040" size={30} />
                </LogoutButton>
            </ProfileBar>
            <Shimmer visible={user.name !== ''}>
                <DeliveryMenu>
                    <DeliveryTitle>Entregas</DeliveryTitle>
                    <Filter>
                        <PendingButton onPress={() => SetShowDelivired(0)}>
                            <FilterButtonText active={ShowDelivired === 0}>
                                Pendentes
                            </FilterButtonText>
                        </PendingButton>
                        <DeliveredButton onPress={() => SetShowDelivired(1)}>
                            <FilterButtonText active={ShowDelivired === 1}>
                                Entregues
                            </FilterButtonText>
                        </DeliveredButton>
                    </Filter>
                </DeliveryMenu>
            </Shimmer>

            {loading ? (
                <>
                    <DeliveryCardComponent loading={true} />
                    <DeliveryCardComponent loading={true} />
                </>
            ) : orders.length > 0 ? (
                <DeliveryList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    data={orders}
                    renderItem={(order) => (
                        <DeliveryCardComponent
                            delivery={order.item}
                            handlerDetail={() => handlerDetail(order.item)}
                        />
                    )}
                />
            ) : (
                <DeliveryListText>Nenhuma Entrega Encontrada</DeliveryListText>
            )}
        </Container>
    );
}
