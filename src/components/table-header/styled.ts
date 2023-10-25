import styled from "styled-components";

export const TableHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: beige;
  padding: 0 20px 0 20px;
`;

export const Users = styled.ul`
  padding: 0 0 0 20px;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    overflow-x: hidden;
  }
`;

export const Name = styled.p`
  width: 15vw;
`;

export const Phone = styled.p`
  width: 10vw;
`;
export const Address = styled.p`
  width: 25vw;
`;
export const Birthday = styled.p`
  width: 10vw;
`;
export const Email = styled.p`
  width: 25vw;
`;