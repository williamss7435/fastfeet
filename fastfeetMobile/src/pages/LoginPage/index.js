import React, {useState} from 'react';
import {Keyboard, StatusBar, ActivityIndicator} from 'react-native';

import * as RootNavigation from '../../routes/RootNavigation';
import ErrorModalMessageComponent from '../../components/ErrorModalMessageComponent';
import Imglogo from '../../assets/images/fastfeet-white-logo.png';
import FastFeetAPI from '../../services/FastFeetAPI';
import {AddUser} from '../../store/modules/user/actions';

import {
    Container,
    Logo,
    Input,
    InputContainer,
    ButtonSubmit,
    ButtonSubmitText,
} from './styles';
import {useDispatch} from 'react-redux';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [idUser, setIdUser] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true);
        setError(null);

        if (idUser === '') {
            setError({
                title: 'ID Inválido',
                message: 'Digite seu ID de cadastro.',
            });
            setLoading(false);
            return;
        }

        const response = await FastFeetAPI.getDeliverymanById(idUser);
        if (response.success && response.data !== null) {
            setLoading(false);
            Keyboard.dismiss();
            dispatch(AddUser(response.data));
            RootNavigation.navigate('App');
        } else {
            setError({
                title: 'Usuário não encontrado',
                message: 'Verifique o seu ID',
            });
        }

        Keyboard.dismiss();
        setLoading(false);
    }

    function OnClose() {
        setError(null);
    }

    return (
        <>
            <Container>
                <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />
                <Logo source={Imglogo} />
                <InputContainer>
                    <Input
                        value={idUser}
                        onChangeText={setIdUser}
                        returnKeyType="send"
                        keyboardType="numeric"
                        onSubmitEditing={handleSubmit}
                    />
                </InputContainer>
                <ButtonSubmit disabled={loading} onPress={handleSubmit}>
                    {loading ? (
                        <ActivityIndicator color="#fff" size={20} />
                    ) : (
                        <ButtonSubmitText>Entrar No Sistema</ButtonSubmitText>
                    )}
                </ButtonSubmit>
            </Container>
            {error && (
                <ErrorModalMessageComponent
                    title={error.title}
                    message={error.message}
                    OnClose={OnClose}
                />
            )}
        </>
    );
}
