import React from 'react';

import {Container, ModalBody} from './styles';
import {FiX} from 'react-icons/fi';

export default function ModalComponent({children,close}){
    return (
        <Container>
            <ModalBody>
                <div className="closeModal"><button onClick={close}><FiX></FiX></button></div>

                {children}

            </ModalBody>
        </Container>
    );

}