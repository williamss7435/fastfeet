import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container} from './styles';

export default function LoadingComponent() {
    return (
        <Container>
            <ActivityIndicator size={50} color="#7D40E7" />
        </Container>
    );
}
