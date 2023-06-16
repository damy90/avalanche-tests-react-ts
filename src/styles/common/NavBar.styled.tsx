import styled from 'styled-components';

export const StyledNavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: #cfd8dc;

    ul {
        display: flex;
        list-style: none;
    }

    li {
        padding-left: 1rem;
    }

    a {
        text-decoration: none;
        color: #0d47a1
    }
`