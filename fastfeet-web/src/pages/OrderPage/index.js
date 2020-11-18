import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';

import {FaCheck, FaChevronLeft} from 'react-icons/fa';

import LoadingComponent from '../../components/LoadingComponent';
import FormComponent from '../../components/FormComponent';
import TitleMenuComponent from '../../components/TitleMenuComponent';

import OrderService from '../../services/OrderService';
import RecipientService from '../../services/RecipientService';
import DeliveryPeopleService from '../../services/DeliveryPeopleService';

import {Container} from './styles';

export default function OrderPage() {
    const history = useHistory();
    const {id: id_order} = useParams();
    
    const [loading, setLoading] = useState(false);

    const [deliveryPeople, setDeliveryPeople] = useState([]);
    const [recipients, setRecipients] = useState([]);

    const [recipientId, setRecipientId] = useState('');
    const [deliverymanId, setDeliverymanId] = useState('');
    const [product, setProduct] = useState('');

    const [formError, setFormError] = useState({
        deliverymanError: '',
        recipientError: '',
        productError: ''
    });
    
    useEffect(() => {
        
        (async () => {
            setLoading(true);
        
            let [responseDeliverypeople, responseRecipients] = await Promise.all([
                DeliveryPeopleService.getAll(), 
                RecipientService.getAll()
            ]);
            
            if(responseRecipients.success && responseDeliverypeople.success){
       
                setDeliveryPeople(responseDeliverypeople.data);
                setRecipients(responseRecipients.data);

                if(id_order !== undefined){
                    const order = await OrderService.getById(id_order);
                
                    if(order.data){
                        
                        setRecipientId(order.data.recipient.id);
                        setDeliverymanId(order.data.deliveryman.id);
                        setProduct(order.data.product);

                    }else {
                        toast.error("Entrega não encontrada");
                        history.push("/order-manager");
                    }
                }

            }else {
                toast.error("Erro ao carregar os parâmetros");
                history.push("/order-manager");
            }

            setLoading(false);
        })();

    }, [history, id_order]);

    async function handleSubmit(){
        setLoading(true);

        const formVerification = {
            message: null,
            error: {
                recipientError: '',
                deliverymanError: '',
                productError: ''
            }
        };

        if(recipientId === ""){
            formVerification.message = "Escolha um destinatário"
            formVerification.error.recipientError = "error";
        }else if(deliverymanId === ""){
            formVerification.message = "Escolha um entregador";
            formVerification.error.deliverymanError = "error";
        }else if(product.length < 3){
            formVerification.message = "O Nome do Produto deve ter no minino 3 caracteres"
            formVerification.error.productError = "error";
        }

        if(formVerification.message){
            setLoading(false);
            toast.error(formVerification.message);
            setFormError(formVerification.error);
            return;
        }

        setFormError(formVerification.error);
        
        let response;
        let message;
        const data = {
            recipient_id: Number(recipientId),
            deliveryman_id: Number(deliverymanId),
            product
        }
    
        if(id_order === undefined){

            response = await OrderService.create(data);
            message = "Encomenda salva com sucesso!!";
            
            data.recipient_id = '';
            data.deliveryman_id = '';
            data.product = '';

        }else {
            response = await OrderService.updateById(id_order, data);

            message = "Encomenda editada com sucesso!!";
    
            if(response.success){
                data.recipient_id = response.data.recipient_id;
                data.deliveryman_id = response.data.deliveryman_id;
                data.product = response.data.product;
            }
            
        }

        if(response.success){

            toast.success(message);
            setRecipientId(data.recipient_id);
            setDeliverymanId(data.deliveryman_id);
            setProduct(data.product);

        }else {
            toast.error(response.error);
            history.push('/order-manager');
        }
        
        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}

            <TitleMenuComponent>
                <div><h1>{id_order === undefined ? "Cadastro de encomendas" : "Edição de encomendas"}</h1></div>
                <div>
                <button type="button" onClick={() => history.push('/order-manager')}><FaChevronLeft/> VOLTAR</button>
                <button type="button" onClick={handleSubmit} className="btn-purple"><FaCheck/> SALVAR</button>
                </div>
            </TitleMenuComponent>
            {recipients.length> 0 && deliveryPeople.length > 0 &&

            <FormComponent>
                <section>
                    <div className="column">
                        <label htmlFor="">Destinatário</label>
                        <select value={recipientId} className={formError.recipientError} onChange={(event) => setRecipientId(event.target.value)}>
                            <option value="">Escolha um destinatário</option>
                            {recipients.map((recipient, index) => {
                                return <option key={index} value={recipient.id}>{recipient.name}</option> 
                            })}
                        </select>
                    </div>

                    <div className="column">
                        <label htmlFor="">Entregador</label>
                        <select value={deliverymanId} className={formError.deliverymanError} onChange={(event) => setDeliverymanId(event.target.value)}>
                            <option value="">Escolha um entregador</option>
                            {deliveryPeople.map((deliveryman, index) => {
                                return <option key={index} value={deliveryman.id}>{deliveryman.name}</option> 
                            })}
                        </select>
                    </div>
                </section>

                <section>
                    <div className="column">
                        <label htmlFor="">Nome do produto</label>
                        <input className={formError.productError} type="text" value={product} onChange={(event) => {setProduct(event.target.value)}}/>
                    </div>
                </section>

            </FormComponent>
            
            }
        </Container>
    );
}