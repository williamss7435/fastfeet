import React, { useState } from 'react';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import LoginService from '../../services/LoginService';

import {AddAuth} from '../../store/modules/auth/actions';

import {Container, LoginBox, LoginForm,ButtonSubmit, LoadingIcon, Input} from './styles';
import logoPng from '../../assets/images/fastfeet-logo.png';

export default function LoginPage(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitError, setSubmitError] = useState({
        email: false,
        password: false,
    });

    const [loading, setLoading] = useState(false);


    async function handleLoginSubmit(event){
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);

        const errorSubmit = {
            email: false,
            password: false
        }
        setSubmitError(errorSubmit);

        if(email.length <= 0) errorSubmit.email = true;
        
        if(password.length <= 0) errorSubmit.password = true;
        
        if(errorSubmit.password || errorSubmit.email){
            setLoading(false);
            return;
        }

        const response = await LoginService.SignIn({email, password});


        if(response.success){
            dispatch(AddAuth(response.data));
            history.push('/order-manager');
        }else {
            toast.error("Usuário ou senha inválido");
            setLoading(false);
        }

    }

    return (
        <Container>
            <LoginBox>
                <img src={logoPng} alt="Fast Feet"/>
                <LoginForm onSubmit={handleLoginSubmit}>
                    
                    <label htmlFor="email"><strong>SEU E-MAIL</strong></label>
                    <Input 
                        disabled={loading}
                        error={submitError.email}
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder=" exemplo@email.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}    
                    />
                    
                    <label htmlFor="password"><strong>SUA SENHA</strong></label>
                    <Input
                        disabled={loading}
                        error={submitError.password}
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder=" **************"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                
                    <ButtonSubmit loading={loading.toString()} disabled={loading} type="submit">
                        {loading ? <LoadingIcon/> : "Entrar no sistema"}
                    </ButtonSubmit>

                </LoginForm>
            </LoginBox>
        </Container>
    );
}