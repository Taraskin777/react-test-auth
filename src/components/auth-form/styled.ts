import styled from "styled-components";

export const Auth = styled.div`
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  border-radius: 10px;
`;

export const Title = styled.h1`
  color: red;
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  input {
    border: 1px solid #bcbcbc;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.2s;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 8px 1px rgb(23, 124, 242);
      transition: all 0.2s;
    }
  }
`;

export const Submit = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 40px;
  button {
    cursor: pointer;
    width: 100%;
    background-color: #36a036;
    border: none;
    height: 30px;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: green;
      transition: background-color 0.3s;
    }
  }
`;
