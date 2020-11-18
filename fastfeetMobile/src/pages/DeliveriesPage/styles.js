import styled, {css} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

import PhotoComponent from '../../components/PhotoComponent';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 0 25px;
`;

export const ProfileBar = styled.View`
    margin-top: 35px;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Photo = styled(PhotoComponent)``;

export const Profile = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const LogoutButton = styled.TouchableOpacity`
    margin-left: 30px;
`;

export const ProfileName = styled.Text`
    color: #444444;
    font-size: 22px;
    font-weight: bold;
`;

export const WelcomeText = styled.Text`
    color: #666666;
    font-size: 12px;
`;

export const DeliveryMenu = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`;

export const DeliveryTitle = styled.Text`
    font-size: 22px;
    color: #444444;
    font-weight: bold;
`;

export const Filter = styled.View`
    flex-direction: row;
`;

export const PendingButton = styled.TouchableOpacity`
    margin-right: 15px;
`;
export const DeliveredButton = styled.TouchableOpacity``;

export const FilterButtonText = styled.Text`
    ${(props) =>
        props.active
            ? css`
                  color: #7d40e7;
                  text-decoration: underline;
              `
            : css`
                  color: #999999;
              `};

    font-weight: bold;
`;

export const DeliveryList = styled.FlatList`
    margin-top: 5px;
`;

export const Shimmer = styled(createShimmerPlaceholder(LinearGradient))`
    width: 100%;
`;
export const SmallShimmer = styled(createShimmerPlaceholder(LinearGradient))`
    margin-bottom: 5px;
`;

export const DeliveryListText = styled.Text`
    text-align: center;
    margin-top: 50px;
    font-size: 15px;
    color: #999999;
`;
