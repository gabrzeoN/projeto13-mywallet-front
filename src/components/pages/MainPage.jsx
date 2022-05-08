import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../contexts/UserContext.jsx";
import Transaction from "../Transaction.jsx";

export default function MainPage(){
    const getTransactionsURL = "http://localhost:5000/transaction"; 
    const {userData} = useContext(UserContext);
    const {name, token} = userData
    const [userTransactions, setUserTransactions] = useState(null);

    async function loadTransactions(){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }    
        try{
            const {data: transactions} = await axios.get(getTransactionsURL, config);
            setUserTransactions([...transactions])
            console.log(transactions); // TODO: erase me
        }catch(error){
            alert(error.response.data);
        }
    }

    useEffect(() => loadTransactions(), []);

    return(

        <Main>
            <Top>
                    <h1>Olá, {name}</h1>
                    <ion-icon name="exit-outline"></ion-icon>
            </Top>
                {                    
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
    background-color: purple;

`;

const Top = styled.section`
    display: flex;
`;

const NewTransaction = styled.section`

`;