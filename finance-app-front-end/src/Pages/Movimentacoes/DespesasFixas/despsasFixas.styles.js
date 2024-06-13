import styled from "styled-components";
import { lightGray } from "../../../Shared/Styles/colorScheme";

export const Divisor = styled.div`
    width: 100%;
    margin-bottom: 2em;
    display: flex;
    justify-content: space-between;

    @media (max-width: 650px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Main = styled.main`
    width: 65%;
    height: 40vh;
    overflow-y: auto;

    @media (max-width: 650px) {
        width: 100%;
        height: 30vh;
        margin-bottom: 1em;
    }
    
    /* Estilos para a barra de rolagem */
    &::-webkit-scrollbar {
        width: 8px; /* Largura da barra de rolagem */
    }

    /* Estilo da alça da barra de rolagem */
    &::-webkit-scrollbar-thumb {
        background-color: #888; /* Cor da alça */
        border-radius: 4px; /* Borda arredondada da alça */
    }

    /* Estilo do fundo da barra de rolagem */
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* Cor de fundo da barra de rolagem */
    }

    /* Estilo quando a barra de rolagem estiver passando o mouse */
    &::-webkit-scrollbar-thumb:hover {
        background-color: #555; /* Cor da alça ao passar o mouse */
    }
`;

export const LoadContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;
`;

export const Resume = styled.aside`
    width: 30%;
    background-color: ${lightGray};
    padding: 1em;
    height: 40vh;

    @media (max-width: 650px) {
        width: 100%;
    }
`;
