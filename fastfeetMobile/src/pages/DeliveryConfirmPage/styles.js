import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const SubmitButton = styled.TouchableOpacity`
    background: #7d40e7;
    height: 45px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`;

export const SubmitText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;

export const ContainerPermissionCamera = styled.View`
    background: #eee;
    height: 450px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const PermissionCameraText = styled.Text`
    color: #a1a1a1;
    font-size: 13px;
    font-weight: bold;
`;

export const ContainerCamera = styled.View`
    margin-top: 30px;
    background: #fff;
    height: 450px;
`;

export const ButtonCamera = styled.TouchableOpacity`
    background: rgba(0, 0, 0, 0.2);
    width: 70px;
    height: 70px;
    border-radius: 35px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    align-self: center;
    margin-bottom: 5px;
`;

export const Camera = styled(RNCamera)`
    flex: 1;
`;
