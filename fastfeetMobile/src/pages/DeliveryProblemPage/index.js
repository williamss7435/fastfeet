import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import Background from '../../components/BackgroundComponent';

import LoadingComponent from '../../components/LoadingComponent';
import FastFeetAPI from '../../services/FastFeetAPI';
import {Container, Input, SubmitButton, SubmitText} from './styles';

export default function DeliveryProblemPage({route, navigation}) {
    const {id} = route.params;

    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    async function handlerSubmit() {
        if (description === '') {
            ToastAndroid.showWithGravityAndOffset(
                'Descreva o Problema',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                250,
            );
            return;
        }
        setLoading(true);

        const response = await FastFeetAPI.addOrderProblem(id, description);

        if (response.success) {
            setDescription('');
            ToastAndroid.showWithGravityAndOffset(
                'Problema cadastrado com sucesso',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                250,
            );
            navigation.navigate('DeliveryDetailPage');
        } else {
            setDescription('');
            ToastAndroid.showWithGravityAndOffset(
                'Não foi possivel salvar o problema, por favor tente novamente.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                250,
            );
        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent />}
            <Background>
                <Input
                    multiline={true}
                    numberOfLines={20}
                    placeholder="Inclua aqui o problema que ocorreu na entrega."
                    placeholderTextColor="#999999"
                    textAlignVertical="top"
                    maxLength={200}
                    value={description}
                    onChangeText={setDescription}
                    returnKeyType="send"
                    onSubmitEditing={() => handlerSubmit()}
                    blurOnSubmit={true}
                />
                <SubmitButton onPress={handlerSubmit}>
                    <SubmitText>Enviar</SubmitText>
                </SubmitButton>
            </Background>
        </Container>
    );
}
