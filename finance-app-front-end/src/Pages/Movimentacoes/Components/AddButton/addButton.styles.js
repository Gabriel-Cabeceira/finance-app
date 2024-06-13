import styled from "styled-components";
import { red, fullWhite, lightGray, allBlack } from '../../../../Shared/Styles/colorScheme';

export const Button = styled.button`
    background: ${lightGray};
    color: ${allBlack};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0.1em 1em;
    cursor: pointer;

    &:hover {
        background: ${red};
        color: ${fullWhite};

        .plusSign {
            color: ${fullWhite};
        }
    }

    .plusSign {
        font-size: 2.5em;
        margin-right: 0.2em;
        color: ${allBlack};
    }
`;
