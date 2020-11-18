import styled from 'styled-components';

export const Menu = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0 10px 0;

        h1{
            font-size: 24px;
        }

        button {
            width: 112px;
            height: 36px;
            border: none;
            margin-left: 16px;
            border-radius: 4px;
            font-size: 14px;
            color: #FFF;
            font-weight: bold;
            background: #CCCCCC;
        }

        button.btn-purple {
            background: #7D40E7;
        }
`;