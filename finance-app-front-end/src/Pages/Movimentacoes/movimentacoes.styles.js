import styled from "styled-components";
import { lightGray, lightGrayShadow } from "../../Shared/Styles/colorScheme";

export const Container = styled.div`
    width: 100%;
`;

export const TitleHeaderDiv = styled.div`
    background: ${lightGray};
    width: 100%;
    padding: 2em;
    border-bottom: 1px solid ${lightGrayShadow};


    .title {
        font-weight: bold;
        font-size: 1.5em;
    }

    .sub-title {
        color: ${lightGrayShadow};
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    margin-top: 2em;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
