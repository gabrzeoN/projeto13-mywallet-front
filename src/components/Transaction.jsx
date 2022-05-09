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
    justify-content: space-between;

    div{
        display: flex;
        
        h1{
            font-size: 16px;
            line-height: 19px;
            color: #C6C6C6;
            margin-right: 10px;
        }

        h2{
            font-size: 16px;
            line-height: 19px;
            color: #000000;
        }
    }

    h3{
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: black;
        ${({type}) => {
            if(type === "inflow") return "color: green;"
            else return "color: red;"
        }}
    }
`;