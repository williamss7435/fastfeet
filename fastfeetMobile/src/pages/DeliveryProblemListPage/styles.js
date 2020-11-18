import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const Title = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 19px;
    text-align: center;
    margin-bottom: 13px;
`;

export const ProblemItem = styled.View`
    background: #ffffff;
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    border: 2px solid #0000001a;
    border-radius: 5px;
`;

export const ProblemText = styled.Text`
    color: #999999;
    font-size: 16px;
`;

export const ProblemDateText = styled.Text`
    color: #c1c1c1;
    font-size: 13px;
`;

export const Shimmer = styled(createShimmerPlaceholder(LinearGradient))`
    margin-bottom: 16px;
    height: 60px;
    width: 100%;
    border-radius: 5px;
`;
