import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Logout} from '../../store/modules/user/actions';
import {
    Container,
    Item,
    Label,
    Photo,
    StrongText,
    ButtonLogout,
    ButtonText,
    PhotoContainer,
} from './styles';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <Container>
            <PhotoContainer>
                <Photo size={150} loading={false} uri={user.photo_url} />
            </PhotoContainer>
            <Item>
                <Label>Nome completo</Label>
                <StrongText>{user.name}</StrongText>
            </Item>
            <Item>
                <Label>Email</Label>
                <StrongText>{user.email}</StrongText>
            </Item>
            <Item>
                <Label>Data de casdrastro</Label>
                <StrongText>{user.created_at_formatted}</StrongText>
            </Item>
            <ButtonLogout onPress={() => dispatch(Logout())}>
                <ButtonText>Logout</ButtonText>
            </ButtonLogout>
        </Container>
    );
}
