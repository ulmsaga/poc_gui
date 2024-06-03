import styled, { css } from "styled-components";

export const MenuContextContainer = styled.div`
  border: 1px solid #ffffff2d;
  border-radius: 4px;
  padding: 18px;
  margin: 5px 0;
  box-sizing: border-box;
`;

export const ContextMenu = styled.div`
  position: absolute;
  width: 150px;
  background-color: #fafafb;
  border-radius: 5px;
  box-sizing: border-box;
  opacity: 1;
  z-index: 11;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 6px;
    margin: 0;
    list-style: none;
    border: 2px solid #2a303a;
  }
  ul li {
    padding: 4px 4px;
  }
  ul li:hover {
    cusor: pointer;
    background-color: #42a6fd;
    color: #000000;
  }
`;