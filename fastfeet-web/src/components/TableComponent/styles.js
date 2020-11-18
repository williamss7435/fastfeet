import styled from 'styled-components';

import Scroll from 'perfect-scrollbar-react';

export const Scrollbar = styled(Scroll)`

`;

export const TableContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: 10px auto;

    div.body {
        margin: 0 13px;
        max-height: 450px;
        display: block;
        /* grid-template-columns: ${(props => props.gridTemplateColumns)}; */
        div.content{
            max-height: 390px;
        }

        span.avatar, img.avatar {
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 50%;
            margin-right: 3px;
            color: #A28FD0;
            text-align: center;
            background: #F4EFFC;
        }

        span.status {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 99px;
            height: 25px;
            border-radius: 11px;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            
            span.dot {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                margin-right: 3px;
            }

            &.delivered{
                background: #DFF0DF;
                color: #2CA42B;

                span.dot{
                    background: #2CA42B;
                }
            }
            
            &.withdrawn{
                background: #BAD2FF;
                color: #4D85EE;

                span.dot{
                    background: #4D85EE;
                }
            }

            &.pending{
                background: #F0F0DF;
                color: #C1BC35;

                span.dot{
                    background: #C1BC35;
                }
            }

            &.canceled{
                background: #FAB0B0;
                color: #DE3B3B;

                span.dot{
                    background: #DE3B3B;
                }
            }
            
        }

        div.row {
            display: flex;
            flex-direction: row;
            margin-right: 10px;
            margin-bottom: 21px;

            div.title {
                background: none;
                font-weight: 700;
                margin-top: 0;
                color: #000;
            }

            div {
                color: #999999;
                display: flex;
                background: #FFF;
                height: 57px;
                border-radius: 4px;
                align-items: center;
                padding: 0 20px;
                width: 100%;
            }

        }
        

        button {
            width: 25px;
            height: 25px;
            background: none;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 8px;
            border-radius: 5px;
            border: none;
        
            :hover{
                background: #e8e8e8;
            }
        }

        .text-center{
            justify-content: center;
        }

        .text-right{
            justify-content: right;
        }

        div.title {
            background: none;
            font-weight: 700;
            margin-top: 0;
            color: #000;
        }
    }
    
`;
