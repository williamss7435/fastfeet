import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.nav`
    background: #FFF;
    height: 64px;
    width: 100%;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 25px;

    img {
        width: 135px;
        height: 26px; 
    }

    aside {
        display: flex;
        flex-flow: column nowrap;
        white-space: nowrap;
        margin-right: 20px;

        button {
            background: none;
            border: none;
            color: #DE3B3B;
            margin-top: 5px;
        }

    }

`; 

export const MenuList = styled.ul`
      
        display: flex;
        align-items: center;
        width: 100%;
        border-left: solid #DDDDDD 1px;
        height: 32px;
        margin-left: 20px;

        li {
            margin-left: 20px;
            font-weight: 600;
            letter-spacing: 0px;
        }
    
`;

export const ItemList = styled(Link)`
    margin-left: 20px;
    font-weight: 600;
    letter-spacing: 0px;
    color: ${props => props.selected ? "#444444" : "#999999"}

`;