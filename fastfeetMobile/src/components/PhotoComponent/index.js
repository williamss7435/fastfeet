import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

import {Photo, PhotoDefault, PhotoText, Shimmer} from './styles';

export default function PhotoComponent({uri = null, size, loading = true}) {
    const initialsName = useSelector((state) => state.user.initialsName);

    return loading ? (
        <Shimmer size={size} />
    ) : uri ? (
        <Photo source={{uri}} size={size} />
    ) : (
        <PhotoDefault size={size}>
            <PhotoText size={size}>{initialsName}</PhotoText>
        </PhotoDefault>
    );
}
