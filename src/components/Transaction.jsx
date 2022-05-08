import styled from "styled-components";

export default function Transaction({date, value, description, type, id}){
    return(
        <TransactionContent type={type} id={id} >
            <div>
                <h1>{date}</h1>
                <h2>{description}</h2>
            </div>
            <h3>{value.toFixed(2)/*TODO: colocar vírgula*/}</h3>
        </TransactionContent>
    );
}

const TransactionContent = styled.div`
    display: flex;

    div{
        display: flex;
    }

    h3{
        ${({type}) => {
            if(type === "inflow") return "color: green;"
            else return "color: red;"
        }}
    }
`;