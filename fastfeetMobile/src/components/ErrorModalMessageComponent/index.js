import React from 'react';

import {Container, Modal, Title, Message, Button, ButtonText} from './styles';

export default function ErrorModalMessageComponent({title, message, OnClose}) {
    return (
        <Container>
            <Modal>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <Button onPress={OnClose}>
                    <ButtonText>Confirmar</ButtonText>
                </Button>
            </Modal>
        </Container>
    );
}
