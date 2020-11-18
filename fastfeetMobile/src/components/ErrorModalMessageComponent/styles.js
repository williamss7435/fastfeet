import styled from 'styled-components/native';

export const Container = styled.View`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Modal = styled.View`
    background: #fff;
    width: 80%;
    height: 20%;
    display: flex;
    border-radius: 5px;
    justify-content: space-between;
`;

export const Title = styled.Text`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #96281b;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const Message = styled.Text`
    padding: 0 20px;
    align-self: center;
`;

export const Button = styled.TouchableOpacity`
    background: #96281b;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
