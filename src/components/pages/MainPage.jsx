import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../contexts/UserContext.jsx";
import Transaction from "../Transaction.jsx";

export default function MainPage(){
    const getTransactionsURL = "https://mywallet-gabrielcari.herokuapp.com/transaction";
    const putLogoutURL = "https://mywallet-gabrielcari.herokuapp.com/sign-out";
    const {userData} = useContext(UserContext);
    const {name, token} = userData
    const [userTransactions, setUserTransactions] = useState(null);
    const [userBalance, setUserBalance] = useState(0);
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  

    async function loadTransactions(){   
        try{
            const {data: transactions} = await axios.get(getTransactionsURL, config);
            setUserTransactions([...transactions])
        }catch(error){
            alert(error.response.data);
        }
    }

    async function logout(){
        try{
            await axios.put(putLogoutURL, {}, config);
            navigate("/");
        }catch(error){
            alert(error.response.data);
        }
    }

    useEffect(() => loadTransactions(), []);

    useEffect(() => {
        let sum = 0;
        userTransactions?.forEach(({value, type}) => {
            if(type === "inflow") sum += parseFloat(value);
            else sum -= parseFloat(value);
        })
        setUserBalance(sum);
    }, [userTransactions]);


    return(
        <Main>
            <Top>
                <h1>Olá, {name}</h1>
                <ion-icon name="exit-outline" onClick={logout} ></ion-icon>
            </Top>
            <Transactions userBalance={userBalance}>
                <div>
                    {userTransactions === null
                        ?
                            <p>Carregando transações</p>
                        :    
                            userTransactions.length < 1
                                ?     
                                    <p>Não há registros de entrada ou saída</p>       
                                :     
                                    userTransactions?.map(({date, value, description, type, _id}) => {
                                        return (
                                            <Transaction
                                                key={_id}
                                                date={date}
                                                value={value}
                                                description={description}
                                                type={type}
                                                id={_id}
                                            />
                                            )
                                    })
                                    
                                }
                </div>
                <div className="balance">
                    <h1>SALDO</h1>
                    <h2>{userBalance.toFixed(2)}</h2>
                </div>
            </Transactions>
            <NewTransaction>
                <Link to="/newtransaction/inflow">
                    <div>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <button>Nova entrada</button>
                    </div>
                </Link>
                <Link to="/newtransaction/outflow">
                    <div>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <button>Nova saída</button>
                    </div>
                </Link>
            </NewTransaction>
        </Main>
    );
}

const Main = styled.main`
    *{
        color: var(--main-font)
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

const Transactions = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    min-height: 500px;
    border-radius: 5px;
    padding: 23px 13px;
    margin-bottom: 15px;

    p{
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
    div:first-child h1{
        margin-bottom: 10px;
    }
    .balance{
        display: flex;
        justify-content: space-between;
        h1{
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;
            color: #000000;
        }
        h2{
            color: #000000;
            font-size: 17px;
            line-height: 20px;
            text-align: right;
            ${({userBalance}) => {
                if(userBalance > 0) return "color: green;"
                else if(userBalance < 0) return "color: red;"
            }}
        }
    }
`;

const NewTransaction = styled.section`
    display: flex;
    justify-content: space-between;

    div{
        width: 200px;
        height: 114px;   
        background: var(--main-button);
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        ion-icon{
            font-size: 27px;
            line-height: 20px;
            color: #FFFFFF; 
        }

        button{
            border: 0px;
            background-color: var(--main-button);
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;
            color: #FFFFFF;
        }
    }
`;