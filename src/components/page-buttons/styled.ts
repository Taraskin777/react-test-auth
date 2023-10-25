import styled from "styled-components";

export const PagesButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageButton = styled.button`
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.3);
    transition: all 0.3s;
  }
`;

export const CurrentPage = styled.button`
  font-weight: bold;
  margin-right: 10px;
  transform: scale(1.3);
  transition: all 0.5s;
  cursor: pointer;
`;

export const Dots = styled.span`
  margin-right: 10px;
`;