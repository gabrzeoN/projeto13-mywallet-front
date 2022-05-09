import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../contexts/UserContext";

export default function SignInPage(){
    const postLoginURL = "http://localhost:5000/sign-in"; 
    const {setUserData} = useContext(UserContext);
    const [loginData, setLoginData] = useState({email: "", password: ""});
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    async function login(e){
        e.preventDefault();
        setDisabled(true);
        try{
            const {data} = await axios.post(postLoginURL, loginData);
            const {name, token} = data;
            setUserData({name, token})
            navigate("/main");
        }catch(error){
            alert(error.response.data);
            setDisabled(false);
        }
    }

    return(
        <Main>
            <h1>MyWallet</h1>
            <form onSubmit={login}>
                <input
                    required
                    type="email"
                    placeholder="Email"
                    disabled={disabled}
                    value={loginData.email}
                    onChange={e => setLoginData({...loginData, email: e.target.value})}     
                />
                <input
                    required
                    type="password"
                    placeholder="Senha"
                    disabled={disabled}
                    value={loginData.password}
                    onChange={e => setLoginData({...loginData, password: e.target.value})}     
                />
                <button type="submit" disabled={disabled}>Entrar</button>
            </form>
            <Link to="/sign-up" >
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Main>
    );
}

const Main = styled.main`
    background-color: var(--main-background);
    *{
        color: var(--main-font);
    }

    h1{
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
    }

    input{
        width: 326px;
        height: 58px;
        border: 0px;
        border-radius: 5px;
    }

    button{
        width: 326px;
        height: 58px;
        border: 0px;
        border-radius: 5px;
    }

    p{
    }
`;