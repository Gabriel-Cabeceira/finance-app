import styled from "styled-components";
import { red } from "../../../../Shared/Styles/colorScheme";

export const CarouselContainer = styled.div`
    display: flex;
    align-items: center;
    width: 10em;
    margin-right: 1em;
`;

export const MonthContainer = styled.div`
    overflow: hidden;
    width: 100%;
`;

export const Month = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.3em;

    .underline {
        background: ${red};
        margin-top: 6px; 
        width: 85%;
        height: 1px;
    }
`;

export const ControlButton = styled.button`
    background: none;
    border: none;
    font-size: 3em;
    cursor: pointer;

    &:hover {
        color: ${red};
    }

    &:disabled {
        color: #ddd;
        cursor: not-allowed;
    }
`;
