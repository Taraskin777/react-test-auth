import { useEffect } from "react";
import { TableHeader } from "../table-header";
import { PageButtons } from "../page-buttons";
import { PrevNext } from "../prev-next/prev-next";

import {
  setCurrentPage,
  setData,
  setEditingUser,
  selectUserListState,
} from "../../store/userListSlice";

import { useDispatch, useSelector } from "react-redux";

import { Table, Users, Name, Phone, Address, Birthday, Email } from "./styled";
import { EditUser } from "../edit-user";

interface Data {
  count: number;
  next: string;
  previous: string | null;
  results: Results[];
}

export interface Results {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

export const UsersList = (): JSX.Element => {
  const dispatch = useDispatch();
  const usersState = useSelector(selectUserListState);

  const data = usersState;
  const currentPage = usersState.currentPage;
  const editingUser = usersState.editingUser;
  const resultsPerPage = usersState.resultsPerPage;

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    fetch(
      `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${resultsPerPage}&offset=${
        (currentPage - 1) * resultsPerPage
      }`
    )
      .then((response) => response.json())
      .then((responseData: Data) => {
        dispatch(setData(responseData));
      })
      .catch((error) => {
        console.error("Помилка отримання даних:", error);
      });
  }, [currentPage]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(data.count / resultsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleEditUser = (user: Results) => {
    dispatch(setEditingUser(user));
  };

  const handleSaveUser = (updatedUser: Results) => {
    dispatch(setEditingUser(updatedUser));
    fetch(
      `https://technical-task-api.icapgroupgmbh.com/api/table/${updatedUser.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((responseUser) => {
        const updatedData = JSON.parse(JSON.stringify(data));
        const userIndex = updatedData.results.findIndex(
          (user: Results) => user.id === updatedUser.id
        );
        if (userIndex !== -1) {
          updatedData.results[userIndex] = responseUser;
        }
        dispatch(setData(updatedData));
        dispatch(setEditingUser(null));
      })
      .catch((error) => {
        console.error("Помилка оновлення даних:", error);
      });
  };

  return (
    <Table>
      <PrevNext />

      <TableHeader />

      <Users>
        {data.results.map((person) => (
          <li key={person.id}>
            <Name>{person.name}</Name>
            <Phone>{person.phone_number}</Phone>
            <Address>{person.address}</Address>
            <Birthday>{person.birthday_date}</Birthday>
            <Email>{person.email}</Email>
            {editingUser && editingUser.id === person.id ? (
              <EditUser
                editingUser={editingUser}
                handleSaveUser={handleSaveUser}
              />
            ) : (
              <button
                onClick={() => {
                  if (!editingUser) {
                    handleEditUser(person);
                  }
                }}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </Users>
      <PageButtons
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Table>
  );
};
