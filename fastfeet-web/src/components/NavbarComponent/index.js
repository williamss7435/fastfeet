import React from 'react';

import {Container, MenuList, ItemList} from './styles';
import logoPng from '../../assets/images/fastfeet-logo.png';
import { useDispatch } from 'react-redux';
import {Logout} from '../../store/modules/auth/actions';
import { Link, useHistory, useLocation} from 'react-router-dom';

export default function NavbarComponent({name}){
    const dispatch = useDispatch();
    
    const history = useHistory();
    const location = "/"+useLocation().pathname.split('/')[1];

    function handlerLogout (){
        dispatch(Logout());
        history.push('/');
    }

    return (
        <Container>
            <Link to="/order-manager"><img src={logoPng} alt="Fast Feet"/></Link>
            <MenuList>
                <ItemList 
                    selected={
                        '/order' === location || '/order-manager' === location
                    } 
                    to="/order-manager"
                >
                    ENCOMENDAS
                </ItemList>

                <ItemList
                    selected={
                        '/delivery-people' === location || '/delivery-people-manager' === location
                    }  
                    to="/delivery-people-manager"
                >
                    ENTREGADORES
                </ItemList>

                <ItemList
                    selected={
                        '/recipient' === location || '/recipient-manager' === location
                    }  
                    to="/recipient-manager"
                >
                    DESTINATÀRIOS
                </ItemList>

                <ItemList
                    selected={
                        '/order-problem' === location
                    }  
                    to="/order-problem"
                >
                    PROBLEMAS
                </ItemList>

            </MenuList>
            <aside>
                <span>{name}</span>
                <button onClick={handlerLogout}>Sair do sistema</button>
            </aside>
        </Container>
    );

}