import styled from "styled-components";
import { fullWhite, goldenOrange } from '../../../../Styles/colorScheme'

export const Container = styled.div`
    position: relative;
`;

export const ButtonDiv = styled.button`
    width: 100%;
    padding: 1em;
    font-weight: bold;
    color: ${fullWhite};
    text-align: left;

    &:hover {
        text-decoration: 2px underline ${goldenOrange};
        cursor: pointer;
    }

    .button {
        display: flex;
        align-items: center;    
    }

    &:focus,
    &:active {
        text-decoration: 2px underline ${goldenOrange};
        color: ${fullWhite};
    }
`;