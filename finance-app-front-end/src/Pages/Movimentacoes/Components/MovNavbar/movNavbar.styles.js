import styled from "styled-components";
import { red, fullWhite, lightGray } from '../../../../Shared/Styles/colorScheme';

export const Container = styled.div`
    width: 95%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${red};
    background: #FFFFFF;

    .buttons-list {
        display: flex;
    }

    .list-items {
        padding-top: 9px;
        padding-bottom: 9px;
        margin: 0 1px 0 1px;
        background: ${lightGray};
        font-weight: bold;
    }

    .link-list-items {
        padding: 12px 10px 15px 10px;
    }

    .list-items:hover {
        background: ${red};
        cursor: pointer;
        color: ${fullWhite};
    }

    .list-items.active {
        background: ${red};
        color: ${fullWhite};
    }
`;
