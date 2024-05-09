import React from "react";
import styled from "styled-components";

const SpinnerStyle = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s linear infinite;
    margin: 0 auto;
    margin-top: 20px;
    color: #09f;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const Spinner = ({ text }) => {
    return (
        <SpinnerContainer>
            <SpinnerStyle />
            <p>{text}</p>
        </SpinnerContainer>
    );
}


export default Spinner;
// Path: src/utils/Spinner/index.jsx
