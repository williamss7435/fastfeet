import styled from 'styled-components';

export const SearchMenu = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 13px;

    a {
        display: flex;
        align-content: center;
        justify-content: center;
        background: #7D40E7;
        color: #FFF;
        width: 142px;
        height: 36px;
        font-weight: 600;
        border-radius: 4px;
        font-size: 14px;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }

`;

export const SearchBar = styled.div`

    width: 237px;
    height: 36px;
    background: #fff;
    padding-left: 10px;
    display: flex;
    justify-content: left;
    align-items: center;

    input {
        height: 36px;
        border: none;
        padding-left: 5px;
        width: 100%;
    }

`;