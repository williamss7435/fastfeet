import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const Card = styled.View`
    background: #fff;
    border-radius: 5px;
    border: 2px solid #0000001a;
    padding: 12px 12px 1px 12px;
    margin-bottom: 10px;
`;

export const CardTitle = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`;

export const CardTitleText = styled.Text`
    color: #7d40e7;
    font-weight: bold;
    font-size: 16px;
    margin-left: 5px;
`;

export const CardItem = styled.View`
    margin-bottom: 15px;
`;

export const CardDates = styled.View`
    margin-bottom: 15px;
    flex-direction: row;
    justify-content: space-between;
`;

export const Item = styled.View``;

export const CardItemTitle = styled.Text`
    color: #999999;
    margin-bottom: 1px;
    font-weight: bold;
`;

export const CardItemText = styled.Text`
    color: #666666;
`;

export const ActionButtons = styled.View`
    flex-direction: row;
    border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
    background: ${(props) => (props.disabled ? '#bfc1c7' : '#f8f9fd')};
    border: 1px solid #0000001a;
    flex: 1;
    height: 100px;
    z-index: 100;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: #999999;
    font-size: 12px;
`;
