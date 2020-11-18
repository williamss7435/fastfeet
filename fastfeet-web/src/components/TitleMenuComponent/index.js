import React from 'react';

import {Menu} from './styles';

export default function TitleMenuComponent({children}){

    return (
        <Menu>
            {children}
        </Menu>
    );
}