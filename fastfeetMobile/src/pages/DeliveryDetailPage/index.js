import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/BackgroundComponent';
import {
    Container,
    Card,
    CardTitle,
    CardTitleText,
    CardItem,
    CardItemTitle,
    CardItemText,
    Item,
    CardDates,
    ActionButtons,
    Button,
    ButtonText,
} from './styles';

export default function DeliveryDetailPage({navigation, route}) {
    const {delivery} = route.params;
    const [deliverySelected, setDeliverySelected] = useState(delivery);
    const [disableButtonConfirm, setDisableButtonConfirm] = useState(
        deliverySelected.end_date !== null,
    );

    useEffect(() => {
        setDeliverySelected(delivery);
        setDisableButtonConfirm(deliverySelected.end_date !== null);
    }, [navigation, delivery, deliverySelected.end_date]);

    return deliverySelected ? (
        <Container>
            <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />
            <Background>
                <Card>
                    <CardTitle>
                        <Icon name="local-shipping" color="#7d40e7" size={25} />
                        <CardTitleText>Informações da entrega</CardTitleText>
                    </CardTitle>
                    <CardItem>
                        <CardItemTitle>DESTINATÁRIO</CardItemTitle>
                        <CardItemText>
                            {deliverySelected.recipient.name}
                        </CardItemText>
                    </CardItem>
                    <CardItem>
                        <CardItemTitle>ENDEREÇO DE ENTREGA</CardItemTitle>
                        <CardItemText>
                            {deliverySelected.recipient.street},{' '}
                            {deliverySelected.recipient.number},{' '}
                            {deliverySelected.recipient.city} -{' '}
                            {deliverySelected.recipient.state},{' '}
                            {deliverySelected.recipient.zip_code}
                        </CardItemText>
                    </CardItem>
                    <CardItem>
                        <CardItemTitle>PRODUTO</CardItemTitle>
                        <CardItemText>{deliverySelected.product}</CardItemText>
                    </CardItem>
                </Card>
                <Card>
                    <CardTitle>
                        <Icon name="event" color="#7d40e7" size={25} />
                        <CardTitleText>Situação da entrega</CardTitleText>
                    </CardTitle>
                    <CardItem>
                        <CardItemTitle>STATUS</CardItemTitle>
                        <CardItemText>
                            {deliverySelected.status.name}
                        </CardItemText>
                    </CardItem>
                    <CardDates>
                        <Item>
                            <CardItemTitle>DATA DE RETIRADA</CardItemTitle>
                            <CardItemText>
                                {deliverySelected.start_date_formatted}
                            </CardItemText>
                        </Item>
                        <Item>
                            <CardItemTitle>DATA DE ENTREGA</CardItemTitle>
                            <CardItemText>
                                {deliverySelected.end_date_formatted}
                            </CardItemText>
                        </Item>
                    </CardDates>
                </Card>
                <ActionButtons>
                    <Button
                        onPress={() =>
                            navigation.navigate('DeliveryProblemPage', {
                                id: deliverySelected.id,
                            })
                        }>
                        <Icon name="highlight-off" color="#E74040" size={25} />
                        <ButtonText>Informar</ButtonText>
                        <ButtonText>Problema</ButtonText>
                    </Button>
                    <Button
                        onPress={() =>
                            navigation.navigate('DeliveryProblemListPage', {
                                product: deliverySelected.product,
                                id: deliverySelected.id,
                            })
                        }>
                        <Icon name="info-outline" color="#E7BA40" size={25} />
                        <ButtonText>Visualizar</ButtonText>
                        <ButtonText>Problemas</ButtonText>
                    </Button>
                    <Button
                        disabled={disableButtonConfirm}
                        onPress={() =>
                            navigation.navigate('DeliveryConfirmPage', {
                                id: deliverySelected.id,
                            })
                        }>
                        <Icon
                            name="check-circle-outline"
                            color={disableButtonConfirm ? '#A1A1A1' : '#7D40E7'}
                            size={25}
                        />
                        <ButtonText>Confirmar</ButtonText>
                        <ButtonText>Entrega</ButtonText>
                    </Button>
                </ActionButtons>
            </Background>
        </Container>
    ) : (
        <View />
    );
}
