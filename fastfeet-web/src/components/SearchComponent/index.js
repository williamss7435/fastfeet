import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import {SearchMenu, SearchBar} from './styles';
import {FaSearch, FaPlus} from 'react-icons/fa';

export default function SearchComponent({fnSearch, btnRedirect, placeholder}){
    
    const [fnTimeOut, setFnTimeOut] = useState(null);
    const [search, setSearch] = useState('');

    function handlerSearch(InputValue){
        setSearch(InputValue);
        clearTimeout(fnTimeOut);
        const fn = setTimeout(
            () => fnSearch(InputValue), 
        500);

        setFnTimeOut(fn);
    }

    return (
        <SearchMenu>
            <SearchBar>
                <FaSearch size={16} color="#999999"/>
                <input value={search} onChange={(event) => handlerSearch(event.target.value)} type="text" placeholder={placeholder}/>
            </SearchBar>
            <Link to={btnRedirect}><FaPlus size={12}/><span>CADASTRAR</span></Link>
        </SearchMenu>
    );

}