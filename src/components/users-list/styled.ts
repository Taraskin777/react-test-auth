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

export const EditUser = styled.div`
  position: absolute;
`;

export const EditName = styled.input`
  width: 15vw;
`;
export const EditPhone = styled.input`
  width: 10vw;
`;
export const EditAddress = styled.input`
  width: 25vw;
`;
export const EditBirthday = styled.input`
  width: 10vw;
`;
export const EditEmail = styled.input`
  width: 25vw;
`;
