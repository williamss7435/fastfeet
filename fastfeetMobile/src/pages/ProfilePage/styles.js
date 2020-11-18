import styled from 'styled-components/native';
import PhotoComponent from '../../components/PhotoComponent';

export const Container = styled.View`
    background: #fff;
    flex: 1;
    padding: 0 36px;
`;

export const PhotoContainer = styled.View`
    margin-top: 70px;
    margin-bottom: 40px;
    align-self: center;
`;

export const Photo = styled(PhotoComponent)``;

export const Item = styled.View`
    flex-wrap: wrap;
    margin-bottom: 15px;
`;

export const Label = styled.Text`
    color: #666666;
    font-size: 13px;
`;

export const StrongText = styled.Text`
    color: #000;
    font-size: 23px;
    font-weight: bold;
`;

export const ButtonLogout = styled.TouchableOpacity`
    background: #e74040;
    height: 45px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
`;
