import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';

import {FaCheck, FaChevronLeft} from 'react-icons/fa';

import LoadingComponent from '../../components/LoadingComponent';
import FormComponent from '../../components/FormComponent';
import TitleMenuComponent from '../../components/TitleMenuComponent';


import DeliveryPeopleService from '../../services/DeliveryPeopleService';

import {Container} from './styles';
import FileService from '../../services/FileService';

export default function DeliveryPeoplePage() {
    const history = useHistory();
    const {id: id_deliveryman} = useParams();
    
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [initials, setInitials] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const [formError, setFormError] = useState({
        nameError: '',
        emailError: ''
    });
    
    useEffect(() => {
        
        (async () => {


            if(id_deliveryman !== undefined){
                setLoading(true);
                
                const response = await DeliveryPeopleService.getById(id_deliveryman);

                if(response.success && response.data !== undefined){

                    setName(response.data.name);
                    setEmail(response.data.email);
                    setInitials(response.data.initials);
                    if(response.data.photo){
                        setPhotoPreview(response.data.photo.url);
                    }

                }else{
                    toast.error('Entregador não encontrado.');
                    history.push('/delivery-people-manager');
                }

                setLoading(false);
            }
            

        })();

    }, [history, id_deliveryman]);


    async function handlerChangePhoto(event){
        if(event.target.files.length > 0){
            const photoURL = URL.createObjectURL(event.target.files[0])
            setPhotoPreview(photoURL);
            setPhoto(event.target.files);
        }
    }

    function handlerSelectPhoto(){
        document.getElementById('photoDeliveryMan').click();
    }

    async function handlerSubmit(){
        setLoading(true);

        const formVerification = {
            message: null,
            error: {
                nameError: '',
                emailError: '',
            }
        };

       
        if(name.length < 3){
            formVerification.message = "O nome do entregador deve ter no minino 3 caracteres"
            formVerification.error.nameError = "error";
        }else if(! /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)){
            formVerification.message = "Email inválido";
            formVerification.error.emailError = "error";
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
            email,
        }
        

        if(photo){

            response = await FileService.saveImage(photo);
    
            if(response.success){
                data.photo_id = response.data.id;
            }else{
                toast.error(response.error || 'Erro ao salvar foto');
            }
            
        }


        if(id_deliveryman === undefined){

            response = await DeliveryPeopleService.create(data);
            message = "Entregador criado com sucesso!!";
            
            data.name = '';
            data.email = '';
            data.resetPhotoPreview = true;
            
        }else {
            response = await DeliveryPeopleService.updateById(id_deliveryman, data);

            message = "Entregador editado com sucesso!!";
    
            if(response.success){
                data.name = response.data.name;
                data.email = response.data.email;
                data.resetPhotoPreview = false;
            }
            
        }

        if(response.success){

            toast.success(message);
            setName(data.name);
            setEmail(data.email);

            if(data.resetPhotoPreview){
                setPhotoPreview(null);
            }
            
        }else {
            toast.error(response.error);
            history.push('/delivery-people-manager');
        }
        
        setLoading(false);
    }

    return (
        <Container>
            {loading && <LoadingComponent/>}

            <TitleMenuComponent>
                <div><h1>{id_deliveryman === undefined ? "Cadastro de entregadores" : "Edição de entregadores"}</h1></div>
                <div>
                <button type="button" onClick={() => history.push('/delivery-people-manager')}><FaChevronLeft/> VOLTAR</button>
                <button type="button" onClick={handlerSubmit} className="btn-purple"><FaCheck/> SALVAR</button>
                </div>
            </TitleMenuComponent>

            <FormComponent>
                {(id_deliveryman && photoPreview == null) ?
                    (
                        <section>
                            <div className="column" onClick={handlerSelectPhoto}>
                                <div className="preview">{initials}</div>
                            </div>
                        </section>)
                    :
                    (
                        <section>
                            <div className="column" onClick={handlerSelectPhoto}>
                                <img className="preview" src={photoPreview} alt=""/>
                            </div>
                        </section>
                    )
                }
                <input readOnly hidden type="file" id="photoDeliveryMan" accept=".png, .jpeg, .jpg" onChange={handlerChangePhoto}/>
                <section>
                    <div className="column">
                        <label htmlFor="">Nome</label>
                        <input className={formError.nameError} type="text" value={name} onChange={(event) => {setName(event.target.value)}}/>
                    </div>
                </section>

                <section>
                    <div className="column">
                        <label htmlFor="">Email</label>
                        <input className={formError.emailError} type="text" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                    </div>
                </section>

            </FormComponent>

        </Container>
    );
}