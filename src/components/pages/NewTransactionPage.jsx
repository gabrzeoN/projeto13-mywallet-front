import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext.jsx";
import axios from "axios";

export default function NewTransactionPage(){
    const {transactionType} = useParams();
    const postNewTransactionURL = `https://mywallet-gabrielcari.herokuapp.com/transaction/${transactionType}`;
    const {userData} = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);
    const [newTransactionData, setNewTransactionData] = useState({value: "", description: ""});
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }  
    let text1 = null;
    let text2 = null;
    if(transactionType === "inflow"){
        text1 = "Nova entrada";
        text2 = "Salvar entrada";
    }else if(transactionType === "outflow"){
        text1 = "Nova saída";
        text2 = "Salvar saída";
    }

    async function saveTransaction(e){
        e.preventDefault();
        setDisabled(true);
        try{
            await axios.post(postNewTransactionURL, newTransactionData, config);
            navigate("/main");
        }catch(error){
            alert(error.response.data);
            setDisabled(false);
        }
    }

    return(
        <Main>
            <Top>
                <h1>{text1}</h1>
            </Top>
            <NewTransaction>
                <form onSubmit={saveTransaction}>
                    <input
                        required
                        type="number"
                        placeholder="Valor"
                        disabled={disabled}
                        value={newTransactionData.value}
                        onChange={e => setNewTransactionData({...newTransactionData, value: e.target.value})}     
                    />
                    <input
                        required
                        type="text"
                        placeholder="Descrição"
                        disabled={disabled}
                        value={newTransactionData.description}
                        onChange={e => setNewTransactionData({...newTransactionData, description: e.target.value})}     
                    />
                    <button type="submit" disabled={disabled}>{text2}</button>
                </form>
            </NewTransaction>
        </Main>
    );
}

const Main = styled.main`
    *{
        color: var(--main-font);
    }
    padding: 25px;
`;

const Top = styled.section`
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    margin-bottom: 22px;
    ion-icon{
        font-size:35px;
    }
`;

const NewTransaction = styled.section`
    
    form{
        display: flex;
        flex-direction: column;
    }
    input{
        width: 100%;
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
        width: 100%;
        height: 58px;
        border: 0px;
        border-radius: 5px;
        margin-bottom: 36px;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
    }
`;