import styled from 'styled-components';

export const StyledForm = styled.form`
    margin: 0 auto 0 auto;  
    width:100%; 
    text-align:center;
    margin: 20px 0px 20px 0px;  
    h1{
        font-size:1.5em;
        color:#525252;
    }
    .box{
        background:white;
        width:300px;
        border-radius:6px;
        margin: 0 auto 0 auto;
        padding:0px 0px 70px 0px;
        border: #2980b9 4px solid; 
    }

    body {
        background: #ecf0f1;
    }

    .invalid-feedback {
        color: red;
    }

    .danger-option {
        border-radius:4px;
        background:#ecf0f1;
        border: "#ccc" 1px solid;
        padding: 8px;
        font-size:1em;
        margin: 10px 0;
    }

    .hidden {
        /* display: none */
    }
`