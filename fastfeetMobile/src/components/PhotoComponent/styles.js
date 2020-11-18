import styled, {css} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

export const Photo = styled.Image`
    background: #f4effc;
    ${(props) => {
        return css`
            width: ${props.size + 'px'};
            height: ${props.size + 'px'};
            border-radius: ${props.size / 2 + 'px'}; ;
        `;
    }}
`;

export const PhotoDefault = styled.View`
    background: #f4effc;
    text-align: center;
    justify-content: center;
    align-items: center;

    ${(props) => {
        return css`
            width: ${props.size + 'px'};
            height: ${props.size + 'px'};
            border-radius: ${props.size / 2 + 'px'}; ;
        `;
    }}
`;
export const PhotoText = styled.Text`
    color: #a28fd0;
    font-size: ${(props) => props.size / 2 + 'px'};
`;

export const Shimmer = styled(createShimmerPlaceholder(LinearGradient))`
    ${(props) => {
        return css`
            width: ${props.size + 'px'};
            height: ${props.size + 'px'};
            border-radius: ${props.size / 2 + 'px'}; ;
        `;
    }}
`;
