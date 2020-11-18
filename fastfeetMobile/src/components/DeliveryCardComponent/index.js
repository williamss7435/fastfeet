import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Container,
    Title,
    TitleText,
    Status,
    StatusDot,
    StatusLine,
    StatusDescription,
    StatusDescriptionContainer,
    Footer,
    FooterContainer,
    SmallTextGray,
    StrongText,
    Button,
    ButtonText,
    Shimmer,
} from './styles';

export default function DeliveryCardComponent({
    handlerDetail,
    loading = false,
    delivery = {},
}) {
    return loading ? (
        <Shimmer />
    ) : (
        <Container>
            <Title>
                <Icon name="local-shipping" color="#7d40e7" size={35} />
                <TitleText>{delivery.product}</TitleText>
            </Title>
            <Status>
                <StatusDot active={delivery.status.id > 0} />
                <StatusLine />
                <StatusDot active={delivery.status.id > 1} />
                <StatusLine />
                <StatusDot active={delivery.status.id > 2} />
            </Status>
            <StatusDescription>
                <StatusDescriptionContainer>
                    <SmallTextGray>Aguardando</SmallTextGray>
                    <SmallTextGray>Retirada</SmallTextGray>
                </StatusDescriptionContainer>
                <StatusDescriptionContainer>
                    <SmallTextGray>Retirada</SmallTextGray>
                </StatusDescriptionContainer>
                <StatusDescriptionContainer>
                    <SmallTextGray>Entregue</SmallTextGray>
                </StatusDescriptionContainer>
            </StatusDescription>
            <Footer>
                <FooterContainer>
                    <SmallTextGray>Data</SmallTextGray>
                    <StrongText>{delivery.created_at_formatted}</StrongText>
                </FooterContainer>
                <FooterContainer>
                    <SmallTextGray>Cidade</SmallTextGray>
                    <StrongText>{delivery.recipient.city}</StrongText>
                </FooterContainer>
                <FooterContainer>
                    <Button onPress={handlerDetail}>
                        <Text />
                        <ButtonText>Ver detalhes</ButtonText>
                    </Button>
                </FooterContainer>
            </Footer>
        </Container>
    );
}
