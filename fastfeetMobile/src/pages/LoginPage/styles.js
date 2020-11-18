import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background: #7d40e7;

    justify-content: center;
    align-items: center;
    padding: 0 25px;
`;

export const Logo = styled.Image`
    margin-bottom: 40px;
`;

export const InputContainer = styled.View`
    height: 45px;
    align-self: stretch;
    background: #fff;
    border-radius: 5px;
    padding-left: 20px;
    margin-bottom: 15px;
    border: 1px solid #dddddd;
`;

export const Input = styled.TextInput.attrs({
    placeholder: 'Informe seu ID de cadastro',
    placeholderTextColor: '#999999',
})`
    height: 44px;
    border-radius: 5px;
    font-size: 16px;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    height: 45px;
    background: #82bf18;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonSubmitText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
