import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: beige;
  padding: 0 20px 0 20px;
`;

export const Users = styled.ul`
  padding: 0;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 20px 0 20px;
  }
`;

export const Name = styled.p`
  width: 10vw;
  margin: 0;
`;

export const Phone = styled.p`
  width: 15vw;
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
