import styled from "styled-components";



export const Main = styled.main`
    display: flex;
`

export const FlexContainer = styled.div`
    width: 100%;

    @media (max-width: 650px) {
        width: calc(100% - 50px);
    }
`