import {
  EditUserWrapper,
  EditAddress,
  EditBirthday,
  EditEmail,
  EditName,
  EditPhone,
} from "./styled";

import { Results } from "../users-list";

interface IEditUser {
  name: string;
  phone: string;
  address: string;
  birthday: string;
  email: string;
  editingUser: Results;
  setEditingUser: (user: Results) => void;
  handleSaveUser: (user: Results) => void;
}

export const EditUser = ({
  name,
  phone,
  address,
  birthday,
  email,
  editingUser,
  setEditingUser,
  handleSaveUser,
}: IEditUser): JSX.Element => {
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
            setEditingUser(updatedUser);
          }}
        />
        <EditPhone
          type="text"
          value={phone}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              phone_number: e.target.value,
            };
            setEditingUser(updatedUser);
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
            setEditingUser(updatedUser);
          }}
        />
        <EditBirthday
          type="date"
          value={birthday}
          onChange={(e) => {
            const updatedUser = {
              ...editingUser,
              birthday_date: e.target.value,
            };
            setEditingUser(updatedUser);
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
            setEditingUser(updatedUser);
          }}
        />

        <button onClick={() => handleSaveUser(editingUser)}>Save</button>
      </EditUserWrapper>
    </>
  );
};
