import { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import "../assets/css/reset.css";
import "../assets/css/style.css";

import UserContext from "../contexts/UserContext";

import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import NewTransactionPage from "./pages/NewTransactionPage.jsx";


export default function App(){
    // const [userData, setUserData] = useState(null);
    const [userData, setUserData] = useState({name: "Gabriel", token: 'eeaf24b3-b6bc-49d3-995f-a03d9f018b46'}); // TODO: remove me
 

    //a@a/com
    // eeaf24b3-b6bc-49d3-995f-a03d9f018b46
    //a@b.com
    //  980e70be-891c-42fb-9f26-9af6a6607cc2
    return(
        <UserContext.Provider value={ {userData, setUserData} } >
            <BrowserRouter>
                <Routes>
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/newtransaction/:transactionType" element={<NewTransactionPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}