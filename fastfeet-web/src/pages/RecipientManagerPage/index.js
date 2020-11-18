import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {FaPen, FaRegTrashAlt} from 'react-icons/fa';

import DeliveryPeopleService from '../../services/DeliveryPeopleService';

import TableComponent from '../../components/TableComponent';
import SearchComponent from '../../components/SearchComponent';
import LoadingComponent from '../../components/LoadingComponent';

import {Logout} from '../../store/modules/auth/actions';
import {Container} from './styles';
import RecipientService from '../../services/RecipientService';

export default function RecipientManagerPage(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [recipients, setRecipients] = useState([]);
  
    useEffect(() => {
        (async () => {

            setLoading(true);
            const response = await RecipientService.getAll();

            if(response.success){
                setRecipients(response.data);
            }else {
                toast.error(response.error);
                dispatch(Logout());
                history.push('/');
            }

            setLoading(false);
        })();

    }, [dispatch, history]);


    async function handlerSearchByQuery(InputValue){
        setLoading(true);

        const response = await RecipientService.getByQuery(InputValue);
        if(response.success){
            setRecipients(response.data);
        }else {
            toast.error(response.error);
            dispatch(Logout());
            history.push('/');
        }

        setLoading(false);
    }

    async function handlerDelete(id){
        let confirmResponse = window.confirm("Deseja realmente deletar essa encomenda ?");
        setLoading(true);

        if(confirmResponse){
            const response = await DeliveryPeopleService.deleteById(id);

            if(response.success){

                const data = recipients.filter(deliveryman => deliveryman.id === id ? null : deliveryman)
                setRecipients(data);
                toast.success("Entregador deletado com successo!!");

            }else {
                toast.error(response.error || "Não foi possivel deletar o entregador");
            }

        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}

            <h1>Gerenciando destinatários</h1>
            <SearchComponent placeholder={"Buscar por destinatários"} fnSearch={handlerSearchByQuery} btnRedirect="/recipient"/>
            
            <TableComponent title={
                <div className="row">
                    <div className="title text-center">ID</div>
                    <div className="title">Nome</div>
                    <div className="title text-center">Endereço</div>
                    <div className="title text-right">Ações</div>
                </div>}
            >
                {recipients.length > 0 ? 
                    (
                        recipients.map(recipient => {
                            return (
                                <div className="row" key={recipient.id}>
                                    <div className="text-center">#{recipient.id}</div>
                                    <div>{recipient.name}</div>
                                    <div className="text-center">{recipient.street}, {recipient.number} <br/> {recipient.city} - {recipient.state}</div>
                                    <div className="text-right">
                                        <button type="button" onClick={() => {history.push(`/recipient/${recipient.id}`)}}><FaPen color="#4D85EE"/></button>
                                        <button type="button" onClick={() => handlerDelete(recipient.id)}><FaRegTrashAlt color="#DE3B3B"/></button>
                                    </div>
                                </div> 
                            );
                        })
                    ) 
                : 
                    (
                        <div className="row">
                            <div className="text-center">Nenhum entregador encontrado</div>
                        </div> 
                    )}     
            </TableComponent>
        </Container>
    );
}