import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/BackgroundComponent';
import FastFeetAPI from '../../services/FastFeetAPI';

import LoadingComponent from '../../components/LoadingComponent';
import {
    Container,
    ContainerPermissionCamera,
    PermissionCameraText,
    SubmitButton,
    SubmitText,
    ContainerCamera,
    ButtonCamera,
    Camera,
} from './styles';

export default function DeliveryConfirmPage({navigation, route}) {
    const {id} = route.params;

    const [camera, setCamera] = useState();
    const [permissionCamera, setPermissionCamera] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const permission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );

            if (permission) {
                setPermissionCamera(permission);
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Permissão de acesso a câmera',
                        message:
                            'Para confirma a entrega é necessário tira uma foto da assinatura.',

                        buttonNegative: 'Cancelar',
                        buttonPositive: 'OK',
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionCamera(true);
                }
            }
            setLoading(false);
        })();
    }, []);

    async function takePicture() {
        if (camera) {
            setLoading(true);
            const options = {quality: 0.5, base64: true};
            const data = await camera.takePictureAsync(options);

            const response = await FastFeetAPI.confirmOrder(data, id);

            if (response.success) {
                ToastAndroid.showWithGravityAndOffset(
                    'Entrega concluída com sucesso.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    250,
                );
                setLoading(false);
                navigation.navigate('DeliveriesPage');
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    'Não Foi possivel confirmar a entrega, por favor tente novamente mais tarde',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    250,
                );
                setLoading(false);
                navigation.navigate('DeliveryDetailPage');
            }
        }
    }

    return (
        <Container>
            {loading && <LoadingComponent />}
            <Background>
                {permissionCamera ? (
                    <>
                        <ContainerCamera>
                            <Camera
                                ref={(ref) => setCamera(ref)}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.off}
                                captureAudio={false}
                            />
                            <ButtonCamera onPress={takePicture}>
                                <Icon
                                    name="photo-camera"
                                    size={40}
                                    color="#fff"
                                />
                            </ButtonCamera>
                        </ContainerCamera>
                        <SubmitButton onPress={takePicture}>
                            <SubmitText>Enviar</SubmitText>
                        </SubmitButton>
                    </>
                ) : (
                    <ContainerPermissionCamera>
                        <Icon name="photo-camera" size={40} color="#a1a1a1" />
                        <PermissionCameraText>
                            Para confirmar a entrega
                        </PermissionCameraText>
                        <PermissionCameraText>
                            precisamos de acesso a sua camera.
                        </PermissionCameraText>
                    </ContainerPermissionCamera>
                )}
            </Background>
        </Container>
    );
}
