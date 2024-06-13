import styled from "styled-components";
import { slateBlue, fullWhite } from '../../Styles/colorScheme';


export const Nav = styled.nav`
    background: ${slateBlue} !important;
    height: 5em;
    width: 100%;
    color: ${fullWhite};


    .title {
        color: ${fullWhite};
    }

    .avatar {
        margin-right: 10px;
    }

    .menu-items {
        margin: 20px 0px 0 -60px;

        @media screen and (max-width: 768px) {
            margin: 20px 0px 0 -190px;
        }
    }

    .nav-link {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`