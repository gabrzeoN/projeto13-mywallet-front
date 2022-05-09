import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../contexts/UserContext.jsx";
import Transaction from "../Transaction.jsx";

export default function MainPage(){
    const getTransactionsURL = "http://localhost:5000/transaction";
    const putLogoutURL = "http://localhost:5000/sign-out";
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
            console.log(transactions); // TODO: erase me
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

    return(
        <Main>
            <Top>
                <h1>Olá, {name}</h1>
                <ion-icon name="exit-outline" onClick={logout} ></ion-icon>
            </Top>
            <Transactions userBalance>
                {userTransactions === null
                    ?
                        <p>Carregando</p>
                    :    
                        userTransactions.length < 1
                            ?     
                                <p>Não há registros</p>       
                            :      
                                userTransactions?.map(({date, value, description, type, _id}) => {
                                    // setUserBalance(userBalance + value)
                                    return (
                                        <Transaction
                                            key={_id}
                                            date={date}
                                            value={value}
                                            description={description}
                                            type={type}
                                            id={_id}
                                            setUserBalance={setUserBalance}
                                            userBalance={userBalance}
                                        />
                                        )
                                })
                            
                }
                <div className="balance">
                    <p>SALDO</p>
                    <p>{userBalance}</p>
                </div>
            </Transactions>
            <NewTransaction>
                <Link to="/newtransaction/inflow">
                    <button>Nova entrada</button>
                </Link>
                <Link to="/newtransaction/outflow">
                    <button>Nova saída</button>
                </Link>
            </NewTransaction>
        </Main>
    );
}

const Main = styled.main`
    background-color: #979700;

`;

const Top = styled.section`
    display: flex;
`;

const Transactions = styled.section`

    div{
        display: flex;
    }
`;

const NewTransaction = styled.section`

`;