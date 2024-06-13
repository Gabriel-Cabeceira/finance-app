import styled from "styled-components";

export const Marker = styled.div`
    position: absolute;
    height: 100%;
    width: 4px;
    background-color: #000000;
    left: ${({ position }) => position}%;
    top: 0;
`;
