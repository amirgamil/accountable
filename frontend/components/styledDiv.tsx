import styled from "styled-components";

export const StyledDiv = styled.div<{ majorColor?: string }>`
    border: none;
    border-radius: 24px;
    background-color: ${(p) => (p.majorColor ? p.majorColor : "rgb(237, 238, 242)")};
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    z-index: 40;
`;
