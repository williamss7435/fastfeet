import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';

import {FaCheck, FaChevronLeft} from 'react-icons/fa';

import LoadingComponent from '../../components/LoadingComponent';
import FormComponent from '../../components/FormComponent';
import TitleMenuComponent from '../../components/TitleMenuComponent';

import {Container} from './styles';
import RecipientService from '../../services/RecipientService';

export default function RecipientPage() {
    const history = useHistory();
    const {id: recipient_id} = useParams();
    
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    
    const [formError, setFormError] = useState({
        nameError: '',
        streetError: '',
        numberError: '',
        stateError: '',
        emailError: '',
        cityError: '',
        zipCodeError: '',
    });
 
    useEffect(() => {
        
        (async () => {


            if(recipient_id !== undefined){
                setLoading(true);
                
                const response = await RecipientService.getById(recipient_id);

                if(response.success && response.data !== undefined){

                    setName(response.data.name);
                    setStreet(response.data.street);
                    setNumber(response.data.number);
                    setComplement(response.data.complement);
                    setState(response.data.state);
                    setCity(response.data.city);
                    setZipCode(response.data.zip_code);
                    
                }else{
                    toast.error('Entregador não encontrado.');
                    history.push('/recipient-manager');
                }

                setLoading(false);
            }
            

        })();

    }, [history, recipient_id]);

    async function handlerSubmit(){
        setLoading(true);

        const formVerification = {
            message: null,
            error: {
                nameError: '',
                streetError: '',
                numberError: '',
                stateError: '',
                cityError: '',
                zipCodeError: ''
            }
        };
        
        //Validação Generica
        if(name.length < 3){
            formVerification.message = "O nome do entregador deve conter no minino 3 caracteres"
            formVerification.error.nameError = "error";
        }else if(street.length < 3){
            formVerification.message = "A rua deve conter no minino 3 caracteres"
            formVerification.error.streetError = "error";
        }else if(number.length < 1){
            formVerification.message = "O número é o brigatório"
            formVerification.error.numberError = "error";
        }else if(city.length < 3){
            formVerification.message = "A cidade deve conter no minino 3 caracteres"
            formVerification.error.cityError = "error";
        }else if(state.length < 3){
            formVerification.message = "O estado deve conter no minino 3 caracteres"
            formVerification.error.stateError = "error";
        }else if(zipCode.length !== 8){
            formVerification.message = "O cep deve conter 8 caracteres"
            formVerification.error.zipCodeError = "error";
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
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code: zipCode
        }

        if(recipient_id === undefined){

            response = await RecipientService.create(data);
            message = "Destinatário criado com sucesso!!";
            
            data.name = '';
            data.street = '';
            data.number = '';
            data.complement = '';
            data.state = '';
            data.city = '';
            data.zip_code = '';
            
        }else {
            response = await RecipientService.updateById(recipient_id, data);

            message = "Destinatário editado com sucesso!!";
    
            if(response.success){
                data.name = response.data.name;
                data.street = response.data.street;
                data.number = response.data.number;
                data.complement = response.data.complement;
                data.state = response.data.state;
                data.city = response.data.city;
                data.zip_code = response.data.zip_code;
            }
            
        }

        if(response.success){

            toast.success(message);

            setName(data.name);
            setStreet(data.street);
            setNumber(data.number);
            setComplement(data.complement);
            setState(data.state);
            setCity(data.city);
            setZipCode(data.zip_code);
         
        }else {
            toast.error(response.error);
            history.push('/recipient-manager');
        }
        
        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}

            <TitleMenuComponent>
                <div><h1>{recipient_id === undefined ? "Cadastro de destinatários" : "Edição de destinatários"}</h1></div>
                <div>
                <button type="button" onClick={() => history.push('/recipient-manager')}><FaChevronLeft/> VOLTAR</button>
                <button type="button" onClick={handlerSubmit} className="btn-purple"><FaCheck/> SALVAR</button>
                </div>
            </TitleMenuComponent>

            <FormComponent>
                
                <section>
                    <div className="column">
                        <label htmlFor="">Nome</label>
                        <input className={formError.nameError} type="text" value={name} onChange={(event) => {setName(event.target.value)}}/>
                    </div>
                </section>

                <section>
                    <div className="column">
                        <label htmlFor="">Rua</label>
                        <input className={formError.streetError} type="text" value={street} onChange={(event) => {setStreet(event.target.value)}}/>
                    </div>
                    <div className="column">
                        <label htmlFor="">Número</label>
                        <input className={formError.numberError} type="text" value={number} onChange={(event) => {setNumber(event.target.value.replace(/\D/g, ''))}}/>
                    </div>
                    <div className="column">
                        <label htmlFor="">Complemento</label>
                        <input className={formError.complementError} type="text" value={complement} onChange={(event) => {setComplement(event.target.value)}}/>
                    </div>
                </section>

                <section>
                    <div className="column">
                        <label htmlFor="">Cidade</label>
                        <input className={formError.cityError} type="text" value={city} onChange={(event) => {setCity(event.target.value)}}/>
                    </div>
                    <div className="column">
                        <label htmlFor="">Estado</label>
                        <input className={formError.stateError} type="text" value={state} onChange={(event) => {setState(event.target.value)}}/>
                    </div>
                    <div className="column">
                        <label htmlFor="">CEP</label>
                        <input className={formError.zipCodeError} type="text" value={zipCode} onChange={(event) => {
                            setZipCode(
                                event.target.value
                                    .replace(/\D/g, '')
                                    .slice(0, 8)
                            ) 
                        }}/>
                    </div>
                </section>

            </FormComponent>

        </Container>
    );
}