import styled from 'styled-components';

import addPhoto from '../../assets/images/add-photo.png';

export const Form = styled.form`
    background: white;
    border-radius: 4px;
    padding: 20px;

    section {
        display: flex;
        flex: 1;

       

        label {
            font-weight: bold;
            margin-bottom: 7px;
        }

        div.column {
            display: flex;
            flex-direction: column;
            flex: 1;
            margin: 10px;

            input, select {
                height: 45px;
                border-radius: 4px;
                border: 1px solid #DDDDDD;
                color: #999999;
                padding-left: 10px;
            }

            img, div.preview {
                width: 150px;
                height: 150px;
                border: 2px dashed #DDDDDD;
                background: none;
                border-radius: 50%;
                align-self: center;
                text-align: center;
                cursor: pointer;
            }

            div.preview {
                align-items: center;
                display: flex;
                align-content: center;
                justify-content: center;
                font-size: 66px;
                color: #A28FD0;
                background: #F4EFFC;
                border-color: #A28FD0;
            }

            img.preview {
                background-image: url(${addPhoto});
                background-repeat: no-repeat;
                background-position: center;
                background-size: 80%;
            }

            input.error, select.error {
                border-color: red;
            }
            
        }
    }

`;