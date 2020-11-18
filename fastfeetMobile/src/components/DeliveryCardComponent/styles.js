import styled, {css} from 'styled-components/native';

export const Container = styled.View`
    border: #0000001a 1px solid;
    margin-bottom: 30px;
    height: 200px;
`;

export const Title = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 13px;
`;

export const TitleText = styled.Text`
    color: #7d40e7;
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
`;

export const Status = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 7px;
`;

export const StatusDot = styled.View`
    ${(props) => {
        if (props.active) {
            return css`
                background: #7d40e7;
            `;
        }
    }};

    height: 12px;
    width: 12px;
    border-radius: 6px;
    border: #7d40e7 solid 2px;
`;

export const StatusLine = styled.View`
    display: flex;
    background: #7d40e7;
    height: 1px;
    width: 95px;
`;

export const StatusDescription = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 13px;
`;

export const StatusDescriptionContainer = styled.View`
    width: 70px;
    align-items: center;
`;

export const SmallTextGray = styled.Text`
    color: #999999;
    font-size: 11px;
`;

export const StrongText = styled.Text`
    font-weight: bold;
    font-size: 13px;
`;

export const Footer = styled.View`
    background: #f8f9fd;
    flex-direction: row;
    height: 60px;
    justify-content: space-between;
    padding: 0 20px;
`;

export const FooterContainer = styled.View`
    justify-content: center;
`;

export const FooterTitle = styled.Text``;

export const FooterText = styled.Text``;

export const Button = styled.TouchableOpacity`
    align-self: flex-end;
`;

export const ButtonText = styled.Text`
    color: #7d40e7;
    font-weight: bold;
`;

import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const Shimmer = styled(ShimmerPlaceHolder)`
    margin-bottom: 25px;
    height: 220px;
    width: 100%;
`;
