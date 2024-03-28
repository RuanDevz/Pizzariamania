import React, { useEffect, useState } from 'react'
import { RegisterContainer,SucessMessage } from './RegisterStyle.js'
import Input from '../../components/Inputs/Input.jsx'
import Button from '../../components/button/Button.jsx'
import Correto from '../../assets/Correto.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [error, setError] = useState(false);
    const [telefone, setTelefone] = useState('');
    const [isRegistred, setIsregistred] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const telefoneCelularRegex = /^(\+[0-9]{1,3})?([0-9]{2,3})?[0-9]{8,}$/;
    useEffect(() => {
        if (isRegistred) {
            const timeout = setTimeout(() => {
                setIsregistred(false);
                navigate('/login');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [isRegistred, navigate]);

    const HandleClick = () => {
        let isValid = true;

        if (name.length === 0 && sobrenome.length === 0 && email.length === 0 && password.length === 0 && confirmpassword.length === 0) {
            setError('Preencha as informações');
            return;
        }

        if (name.length < 4) {
            setError('Seu nome precisa ter mais de 4 Caracteres');
            isValid = false;
            return;
        }

        if (sobrenome.length < 4) {
            setError('Seu sobrenome precisa ter mais que 4 caracteres');
            isValid = false;
            return;
        }

        if (!telefoneCelularRegex.test(telefone)) {
            setError('Insira um telefone válido');
            isValid = false;
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Insira um email válido');
            isValid = false;
            return;
        }

        if (password.length <= 8) {
            setError('Sua senha precisa ter mais de 8 caracteres');
            isValid = false;
            return;
        }

        if (password !== confirmpassword) {
            setError('As senhas não coincidem');
            isValid = false;
            return;
        }

        if (isValid) {
            setError('');
            setIsregistred(true);
        }

        axios.post("http://localhost:3001/register", {
            Nome: name,
            Sobrenome: sobrenome,
            Telefone: telefone,
            Email: email,
            Senha: password
        })
        
    };

    return (
        <RegisterContainer>
            <h1>Cadastrar usuário</h1>
            {isRegistred ? (
                <SucessMessage id='success'>
                    <h2>Usuario Cadastrado com Sucesso</h2>
                    <img src={Correto} alt='Correto' />
                </SucessMessage>
            ) : (
                <form action=''>
                    <Input type='text' placeholder='Nome' onChange={(e) => setName(e.target.value)} htmlFor='name' id='name' />

                    <Input type='text' placeholder='Sobrenome' onChange={(e) => setSobrenome(e.target.value)} htmlFor='Sobrenome' id='Sobrenome' />

                    <Input type='tel' placeholder='(xx) xxxxx-xxxx' onChange={(e) => setTelefone(e.target.value)} htmlFor='Telefone' id='Telefone' />

                    <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} htmlFor='email' id='email' />

                    <Input type='password' placeholder='Sua senha' onChange={(e) => setpassword(e.target.value)} htmlFor='password' id='password' />

                    <Input type='password' placeholder='Confirmar senha' onChange={(e) => setConfirmpassword(e.target.value)} htmlFor='Confirmpassword' id='Confirmpassword' />
                    {error && <p id='error'>{error}</p>}
                </form>
            )}
            {!isRegistred && <Button childreen='Cadastrar' onClick={HandleClick}></Button>}
        </RegisterContainer>
    );
};

export default Register;