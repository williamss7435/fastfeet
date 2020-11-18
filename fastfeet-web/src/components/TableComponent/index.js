import React from 'react';

import {TableContainer, Scrollbar} from './styles';

export default function TableComponent({children, title}){
   
    return (  
        <TableContainer>
            <div className="body">
                {title}
                <Scrollbar
                    options={{
                        wheelSpeed: 2,
                        wheelPropagation: true,
                        minScrollbarLength: 1
                      }}
                >
                    <div className="content">{children}</div>
                </Scrollbar>
            </div>
        </TableContainer>
    );

}