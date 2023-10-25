import { useState, useEffect } from "react";
import { TableHeader } from "../table-header";
import { PageButtons } from "../page-buttons";
import { PrevNext } from "../prev-next/prev-next";

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
  const [data, setData] = useState<Data | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingUser, setEditingUser] = useState<Results | null>(null);

  console.log(editingUser);

  const resultsPerPage = 10;

  useEffect(() => {
    fetch(
      `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${resultsPerPage}&offset=${
        (currentPage - 1) * resultsPerPage
      }`
    )
      .then((response) => response.json())
      .then((responseData: Data) => {
        setData(responseData);
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
    setCurrentPage(newPage);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleEditUser = (user: Results) => {
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser: Results) => {
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
        const updatedData = { ...data };
        const userIndex = updatedData.results.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (userIndex !== -1) {
          updatedData.results[userIndex] = responseUser;
        }
        setData(updatedData);
        setEditingUser(null);
      })
      .catch((error) => {
        console.error("Помилка оновлення даних:", error);
      });
  };

  return (
    <Table>
      <PrevNext
        prev={data.previous}
        next={data.next}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

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
                name={editingUser.name}
                phone={editingUser.phone_number}
                address={editingUser.address}
                birthday={editingUser.birthday_date}
                email={editingUser.email}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
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
