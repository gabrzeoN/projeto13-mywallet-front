import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function SignUpPage(){
    const postRegisterURL = "https://mywallet-gabrielcari.herokuapp.com/sign-up"; 
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
    background-color: var(--main-background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    *{
        color: var(--main-font);
    }

    h1{
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        margin-bottom: 24px;
    }

    form{
        display: flex;
        flex-direction: column;
    }
    input{
        width: 326px;
        height: 58px;
        border: 0px;
        border-radius: 5px;
        margin-bottom: 13px;
        font-size: 20px;
        line-height: 23px;
        padding-left: 15px;
        color: #000000;
        &::placeholder{
            color: #000000;
        }
    }

    button{
        background-color: var(--main-button);
        width: 326px;
        height: 58px;
        border: 0px;
        border-radius: 5px;
        margin-bottom: 36px;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
    }

    p{
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
    }
`;