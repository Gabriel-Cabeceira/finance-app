import styled from "styled-components";

export const AccordionDiv = styled.div`
    width: 90%;
    margin: 1em 0;
`;

export const Button = styled.button`
    &:focus {
        outline: none;
        background: transparent;
        box-shadow: none;
    }
    

    .buttonInfo {
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
`;

export const List = styled.ul`
    list-style: circle;
    margin-left: 2em;

    .dash-divisor {
        margin: 0 1em 0 1em;
    }

    .list-item-content {
        display: flex;
    }
`;

export const Spans = styled.span``;
