import {
  EditUserWrapper,
  EditAddress,
  EditBirthday,
  EditEmail,
  EditName,
  EditPhone,
} from "./styled";

import { Results } from "../users-list";

import { useSelector, useDispatch } from "react-redux";

import { selectUserListState, setEditingUser } from "../../store/userListSlice";

interface IEditUser {
  editingUser: Results;

  handleSaveUser: (user: Results) => void;
}

export const EditUser = ({
  editingUser,
  handleSaveUser,
}: IEditUser): JSX.Element => {
  const dispatch = useDispatch();

  const state = useSelector(selectUserListState);

  const { name, phone_number, address, birthday_date, email } =
    state.editingUser || {};

  return (
    <>
      <EditUserWrapper>
        <EditName
          type="text"
          value={name}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              name: e.target.value,
            };
            dispatch(setEditingUser(updatedUser));
          }}
        />
        <EditPhone
          type="text"
          value={phone_number}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              phone_number: e.target.value,
            };
            dispatch(setEditingUser(updatedUser));
          }}
        />
        <EditAddress
          type="text"
          value={address}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              address: e.target.value,
            };
            dispatch(setEditingUser(updatedUser));
          }}
        />
        <EditBirthday
          type="date"
          value={birthday_date}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              birthday_date: e.target.value,
            };
            dispatch(setEditingUser(updatedUser));
          }}
        />
        <EditEmail
          type="text"
          value={email}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              email: e.target.value,
            };
            dispatch(setEditingUser(updatedUser));
          }}
        />

        <button onClick={() => handleSaveUser(editingUser)}>Save</button>
      </EditUserWrapper>
    </>
  );
};
