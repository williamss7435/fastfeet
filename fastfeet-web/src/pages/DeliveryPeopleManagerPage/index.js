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

export default function DeliveryPeopleManagerPage(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [deliveryPeople, setDeliveryPeople] = useState([]);
  
    useEffect(() => {
        (async () => {

            setLoading(true);
            const response = await DeliveryPeopleService.getAll();

            if(response.success){
                setDeliveryPeople(response.data);
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

        const response = await DeliveryPeopleService.getByQuery(InputValue);
        if(response.success){
            setDeliveryPeople(response.data);
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

                const data = deliveryPeople.filter(deliveryman => deliveryman.id === id ? null : deliveryman)
                setDeliveryPeople(data);
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

            <h1>Gerenciando entregadores</h1>
            <SearchComponent placeholder={"Buscar por entregadores"} fnSearch={handlerSearchByQuery} btnRedirect="/delivery-people"/>
            
            <TableComponent title={
                <div className="row">
                    <div className="title text-center">ID</div>
                    <div className="title">Foto</div>
                    <div className="title">Nome</div>
                    <div className="title">Email</div>
                    <div className="title text-right">Ações</div>
                </div>}
            >
                {deliveryPeople.length > 0 ? 
                    (
                        deliveryPeople.map(deliveryman => {
                            return (
                                <div className="row" key={deliveryman.id}>
                                    <div className="text-center">#{deliveryman.id}</div>
                                    {deliveryman.photo ?
                                        <div>
                                            <img className="avatar" src={deliveryman.photo.url} alt={deliveryman.name}/>
                                        </div>
                                    :
                                        <div>
                                            <span className="avatar">{deliveryman.initials}</span> 
                                        </div>
                                    }
                                    <div>{deliveryman.name}</div>
                                    <div>{deliveryman.email}</div>
                                    <div className="text-right">
                                        <button type="button" onClick={() => {history.push(`/delivery-people/${deliveryman.id}`)}}><FaPen color="#4D85EE"/></button>
                                        <button type="button" onClick={() => handlerDelete(deliveryman.id)}><FaRegTrashAlt color="#DE3B3B"/></button>
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