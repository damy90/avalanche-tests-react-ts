import styled from 'styled-components';

export const StyledInput = styled.input<{ $validationError?: boolean; }>`
    border-radius:4px;
    background:#ecf0f1;
    border: ${props=> props.$validationError ? "red" : "#ccc"} 1px solid;
    padding: 8px;
    width:85%;
    font-size:1em;
    margin: 10px 0;
`