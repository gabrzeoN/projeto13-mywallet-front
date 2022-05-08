import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function SignUpPage(){
    const postRegisterURL = "http://localhost:5000/sign-up"; 
    const [registerData, setRegisterData] = useState({name: "", email: "", password: "", repeatPassword: ""});
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    async function register(e){
        e.preventDefault();
        setDisabled(true);
        try{
            await axios.post(postRegisterURL, registerData);
            navigate("/");
        }catch(error){
            alert(error.response.data);
            setDisabled(false);
        }
    }

    return(
        <Main>
            <h1>MyWallet</h1>
            <form onSubmit={register}>
                <input
                    required
                    type="text"
                    placeholder="Nome"
                    disabled={disabled}
                    value={registerData.name}
                    onChange={e => setRegisterData({...registerData, name: e.target.value})}     
                />
                <input
                    required
                    type="email"
                    placeholder="Email"
                    disabled={disabled}
                    value={registerData.email}
                    onChange={e => setRegisterData({...registerData, email: e.target.value})}     
                />
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    disabled={disabled}
                    value={registerData.password}
                    onChange={e => setRegisterData({...registerData, password: e.target.value})}     
                />
                <input
                    required
                    type="password"
                    placeholder="Confirme a senha"
                    disabled={disabled}
                    value={registerData.repeatPassword}
                    onChange={e => setRegisterData({...registerData, repeatPassword: e.target.value})}     
                />
                <button type="submit" disabled={disabled}>Cadastrar</button>
            </form>
            <Link to="/" >
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </Main>
    );
}

const Main = styled.main`
    background-color: purple;

    p{
        color: yellow;
    }
`;