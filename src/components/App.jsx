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
    const [userData, setUserData] = useState(null);
 
    return(
        <UserContext.Provider value={ {userData, setUserData} } >
            <BrowserRouter>
                <Routes>
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/newtransaction/:transactionType" element={<NewTransactionPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}