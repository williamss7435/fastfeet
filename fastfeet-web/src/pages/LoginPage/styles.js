import styled, {keyframes} from 'styled-components';
import {FaUndoAlt} from 'react-icons/fa';
//animation: rotation 2s infinite linear;

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

export const LoadingIcon = styled(FaUndoAlt)`
    animation: ${rotate} 2s infinite linear;
`;

export const Container = styled.div`
    height: 100%;
    background: #7D40E7;
    display: flex;
    align-items: center;
    align-self: center;
`;

export const LoginBox = styled.div`
    background: #FFF;
    height: 425px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    

    img {
        margin-top: 45px;
        align-self: center;
    }

    label {
       margin-top: 10px;
    }

    

`;

export const Input = styled.input`
    width: 300px;
    height: 45px;
    border: 1px solid;
    border-color: ${(props) => props.error ? '#ff0000' : '#DDDDDD'};
    border-radius: 4px;
    margin: 7px 0;
    padding-left: 10px;
    line-height: normal;
    align-self: center;
`;

export const ButtonSubmit = styled.button`
    width: 300px;
    height: 45px;
    background: ${props => {
        return props.loading ? '#6c39c4' : '#7D40E7'
    }};
    border-radius: 4px;
    align-self: center;
    color: #FFF;
    margin-top: 25px;
    transition: 0.5s;
    :hover {
        background: #6c39c4;
    }
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 45px;
`;