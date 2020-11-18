import styled from 'styled-components/native';

import PurpleBackground from '../../assets/images/purple-background.jpg';

export default styled.ImageBackground.attrs({
    source: PurpleBackground,
    imageStyle: {
        resizeMode: 'cover',
        height: 130,
        top: 0,
    },
})`
    padding: 70px 20px 0;
`;
