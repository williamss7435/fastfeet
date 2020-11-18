import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    z-index: 99;


`;

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 353px;
    background: #FFF;
    padding: 0;
    margin: 0 auto;
    font-size: 14px;
    color: #666666;

    img {
        height: 70px;
        display: flex;
        margin: 0 auto;
    }

    div.card {
        border-bottom: solid 1px #EEEEEE;
        padding: 10px 25px;

        p {
            margin-bottom: 5px;
        }

        p.modal-title {
            font-weight: bold;
            font-size: 14px;
            color: #444444;
        }
    }

    div.closeModal {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 10px;
        margin-right: 5px;
        
        button {
            display: flex;
            background: none;
            border: none;
            width: 20px;
            height: 20px;
            
            align-items: center;
            justify-content: center;
        }
    }

`;

export const ModalCard = styled.div`
    border-bottom: solid 1px #EEEEEE;
    padding: 10px 25px;

    p {
        margin-bottom: 5px;
    }

    p.modal-title {
        font-weight: bold;
        font-size: 14px;
        color: #444444;
    }

`;
