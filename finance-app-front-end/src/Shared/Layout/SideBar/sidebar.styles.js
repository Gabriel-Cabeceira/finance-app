import styled from "styled-components";
import { MainColor } from '../../Styles/colorScheme';

export const SideConteiner = styled.div`
    width: 200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;


    @media (max-width: 650px) {
        width: 50px;
    }
`

export const SideNav = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${MainColor};

    .list {
        width: 100%;
    }

    .listItems {
        display: flex;
        align-items: center;
    }

    .icon {
        font-size: 1.5em;
        margin-right: 0.3em;
    }
`
