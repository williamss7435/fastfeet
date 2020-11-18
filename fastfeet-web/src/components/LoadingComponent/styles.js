import styled, {keyframes} from 'styled-components';
import {FaSyncAlt} from 'react-icons/fa';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
    background: rgba(235, 235, 235, 0.7);
    width: 100%;
    height: 100%;

    display: flex;
    align-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;

    div {
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        background: rgba(125, 64, 231, 0.2);
        border-radius: 10px;
        color: #7D40E7;
        font-weight: bold;
        font-size: 13px;
        
    }

`;

export const IconLoading = styled(FaSyncAlt)`
    animation: ${rotate} 2s linear infinite;
`;