import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {FaEye, FaPen, FaRegTrashAlt} from 'react-icons/fa';

import OrderService from '../../services/OrderService';

import ModalComponent from '../../components/ModalComponent';
import TableComponent from '../../components/TableComponent';
import SearchComponent from '../../components/SearchComponent';
import LoadingComponent from '../../components/LoadingComponent';

import {Logout} from '../../store/modules/auth/actions';
import {Container} from './styles';

export default function OrderManagerPage(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
        (async () => {
            setLoading(true);

            const response = await OrderService.getAll();
            if(response.success){
                setOrders(response.data);
            }else {
                toast.error(response.error);
                dispatch(Logout());
                history.push('/');
            }

            setLoading(false);
        })();

    }, [dispatch, history]);


    function handlerShowDetails(order){
        setSelectedOrder(order);
        setShowModal(true);
    }

    function handlerHideModal(){
        setShowModal(false);
    }

    async function handlerSearchOrder(InputValue){
        setLoading(true);

        const response = await OrderService.getByQuery(InputValue);
        if(response.success){
            setOrders(response.data);
        }else {
            toast.error(response.error);
            dispatch(Logout());
            history.push('/');
        }

        setLoading(false);
    }

    async function handlerDeleteOrderById(id){
        let confirmResponse = window.confirm("Deseja realmente deletar essa encomenda ?");
        setLoading(true);

        if(confirmResponse){
            const response = await OrderService.deleteById(id);

            if(response.success){

                const data = orders.filter(order => order.id === id ? null : order)
                setOrders(data);
                toast.success("Encomenda deletada com successo!!");

            }else {
                toast.error(response.error || "Não foi possivel deletar a encomenda");
            }

        }

        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}

            { showModal &&
                <ModalComponent close={handlerHideModal}>
                    <div className="card">
                        <p className="modal-title">Informações da encomenda</p>
                        <p>{`${selectedOrder.recipient.street}, ${selectedOrder.recipient.number}`}</p>
                        <p>{`${selectedOrder.recipient.city} - ${selectedOrder.recipient.state}`}</p>
                        <p>{selectedOrder.recipient.zip_code}</p>
                    </div>

                    <div className="card">
                        <p className="modal-title">Datas</p>
                        <p><strong>Retirada:</strong> {selectedOrder.start_date ? selectedOrder.start_date : "-"}</p>
                        <p><strong>Entrega:</strong> {selectedOrder.end_date ? selectedOrder.end_date : '-'}</p>
                    </div>

                    {selectedOrder.signature_url &&
                        <div className="card">
                            <p className="modal-title">Assinatura do destinatário</p>
                            <img src={selectedOrder.signature_url} alt="Assinatura" />
                        </div>
                    }
                </ModalComponent> 
            }

            <h1>Gerenciando encomendas</h1>
            <SearchComponent placeholder={"Buscar por encomendas"} fnSearch={handlerSearchOrder} btnRedirect="/order"/>
            
            <TableComponent title={
                <div className="row">
                    <div className="title text-center">ID</div>
                    <div className="title">Destinatário</div>
                    <div className="title">Entregador</div>
                    <div className="title">Cidade</div>
                    <div className="title">Estado</div>
                    <div className="title">Status</div>
                    <div className="title text-right">Ações</div>
                </div>}
            >
                {orders.length > 0 ? 
                    (
                        orders.map(order => {
                            return (
                                <div className="row" key={order.id}>
                                    <div className="text-center">#{order.id}</div>
                                    <div>{order.recipient.name}</div>
                                    {order.deliveryman.photo ?
                                        <div>
                                            <img className="avatar" src={order.deliveryman.photo.url} alt={order.deliveryman.name}/>
                                            {order.deliveryman.name}
                                        </div>
                                    :
                                        <div>
                                            <span className="avatar">{order.deliveryman.initials}</span>
                                            {order.deliveryman.name}
                                        </div>
                                    }
                                    <div>{order.recipient.city}</div>
                                    <div>{order.recipient.state}</div>
                                    <div>
                                        <span className={`status ${order.status.name}`}><span className="dot"></span>{order.status.message}</span>
                                    </div>
                                    <div className="text-right">
                                        <button type="button" onClick={() => handlerShowDetails(order)}><FaEye color="#8E5BE8"/></button>
                                        <button type="button" onClick={() => {history.push(`/order/${order.id}`)}}><FaPen color="#4D85EE"/></button>
                                        <button type="button" onClick={() => handlerDeleteOrderById(order.id)}><FaRegTrashAlt color="#DE3B3B"/></button>
                                    </div>
                                </div> 
                            );
                        })
                    ) 
                : 
                
                (
                    <div className="row">
                        <div className="text-center">Nenhuma encomenda encontrada</div>
                    </div> 
                )}     
            </TableComponent>
        </Container>
    );
}