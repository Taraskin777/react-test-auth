import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  margin-left: 30px;
  margin-right: 30px;
`;

export const PrevNextPage = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  button {
    border-radius: 5px;
    border: solid 1px black;
    width: 200px;
    cursor: pointer;
  }
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
    overflow-x: hidden;
  }
`;

export const Name = styled.p`
  width: 15vw;
  margin: 0;
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
