import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {FaEye, FaRegTrashAlt} from 'react-icons/fa';

import TableComponent from '../../components/TableComponent';
import LoadingComponent from '../../components/LoadingComponent';
import ModalComponent from '../../components/ModalComponent';

import {Logout} from '../../store/modules/auth/actions';
import {Container} from './styles';
import OrderService from '../../services/OrderService';

export default function RecipientManagerPage(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState('');
    
    useEffect(() => {
        (async () => {

            setLoading(true);
            const response = await OrderService.getAllProblems();
            if(response.success){
                setProblems(response.data);
            }else {
                toast.error(response.error);
                dispatch(Logout());
                history.push('/');
            }

            setLoading(false);
        })();

    }, [dispatch, history]);


    async function handlerDelete(id){
        let confirmResponse = window.confirm("Deseja realmente deletar essa encomenda ?");
        setLoading(true);

        if(confirmResponse){
            const response = await OrderService.deleteById(id);

            if(response.success){

                const data = problems.filter(problem => problem.order.id === id ? null : problem);
                setProblems(data);
                toast.success("Encomenda deletada com successo!!");

            }else {
                toast.error(response.error || "Não foi possivel deletar o entregador");
            }

        }

        setLoading(false);
    }

    function handlerShowDetails(problem){
        setSelectedProblem(problem);
        setShowModal(true);
    }

    function handlerHideModal(){
        setShowModal(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}

            { showModal &&
                <ModalComponent close={handlerHideModal}>
                    <div className="card">
                        <p className="modal-title">Visualizar Problema</p>
                        <p>{selectedProblem}</p>
                    </div>
                </ModalComponent> 
            }


            <h1>Problemas na entrega</h1>
            
            <TableComponent title={
                <div className="row">
                    <div className="title">Encomenda</div>
                    <div className="title">Problema</div>
                    <div className="title text-right">Ações</div>
                </div>}
            >
                {problems.length > 0 ? 
                    (
                        problems.map(problem => {
                            return (
                                <div className="row" key={problem.id}>
                                    <div>#{problem.order.id}</div>
                                    <div>{problem.descriptionFormatted}</div>   
                                    <div className="text-right">
                                        <button type="button" onClick={() => handlerShowDetails(problem.description)}><FaEye color="#8E5BE8"/></button>
                                        <button type="button" onClick={() => handlerDelete(problem.order.id)}><FaRegTrashAlt color="#DE3B3B"/></button>
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