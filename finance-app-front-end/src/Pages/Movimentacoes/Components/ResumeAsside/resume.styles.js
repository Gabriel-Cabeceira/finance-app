import styled from "styled-components";
import { red, green } from "../../../../Shared/Styles/colorScheme";

export const TitleDivisor = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.h1`
    font-weight: bold;
`;

export const ReloadButton = styled.button`

`

export const RedLine = styled.div`
    width: 100%;
    height: 1px;
    background: ${red};
`;

export const Divisor = styled.div`
    display: flex;
    margin-top: 1em;

    .salary-title {
        font-weight: bold;
    }
`;

export const SalaryValue = styled.p`
    margin-left: 1em;
    color: ${green};
`;

export const SpendingValue = styled.p`
    margin-left: 1em;
`;

export const ProgressBarDiv = styled.div`
    width: 100%;
`;

export const FooterDivisor = styled.div`
    margin-top: 2em;
    display: flex;

    .salary-footer {
        font-size: 1.5em;
        font-weight: bold;
    }
`;

export const Balance = styled.p`
    margin-left: 1em;
    font-size: 1.5em;
`