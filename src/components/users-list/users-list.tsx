import { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  Users,
  Name,
  Phone,
  Address,
  Birthday,
  Email,
  PagesButtons,
  PageButton,
  CurrentPage,
  Dots,
  PrevNextPage,
  EditUser,
  EditName,
  EditPhone,
  EditAddress,
  EditBirthday,
  EditEmail,
} from "./styled";

interface Data {
  count: number;
  next: string;
  previous: string | null;
  results: Results[];
}

interface Results {
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
      `https://technical-task-api.icapgroupgmbh.com/api/table/${updatedUser.id}`,
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
      <PrevNextPage>
        <button
          onClick={() => {
            if (data.previous) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (data.next) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next Page
        </button>
      </PrevNextPage>

      <TableHeader>
        <Name>Name</Name>
        <Phone>Phone number</Phone>
        <Address>Address</Address>
        <Birthday>Birthday date</Birthday>
        <Email>Email</Email>
      </TableHeader>

      <Users>
        {data.results.map((person) => (
          <li key={person.id}>
            <Name>{person.name}</Name>
            <Phone>{person.phone_number}</Phone>
            <Address>{person.address}</Address>
            <Birthday>{person.birthday_date}</Birthday>
            <Email>{person.email}</Email>
            {editingUser && editingUser.id === person.id ? (
              <EditUser>
                <EditName
                  type="text"
                  value={editingUser.name}
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
                  value={editingUser.phone_number}
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
                  value={editingUser.address}
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
                  value={editingUser.birthday_date}
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
                  value={editingUser.email}
                  onChange={(e) => {
                    const updatedUser = {
                      ...editingUser,
                      email: e.target.value,
                    };
                    setEditingUser(updatedUser);
                  }}
                />

                <button onClick={() => handleSaveUser(editingUser)}>
                  Save
                </button>
              </EditUser>
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
      <PagesButtons>
        {pageNumbers.map((pageNumber) => {
          if (pageNumber === currentPage) {
            return <CurrentPage key={pageNumber}>{pageNumber}</CurrentPage>;
          }

          if (
            pageNumber <= 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PageButton
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{ fontWeight: "normal" }}
              >
                {pageNumber}
              </PageButton>
            );
          } else if (
            (pageNumber === 2 && currentPage > 3) ||
            (pageNumber === totalPages - 1 && totalPages - currentPage > 2)
          ) {
            return <Dots key={pageNumber}>. . .</Dots>;
          }

          return null;
        })}
      </PagesButtons>
    </Table>
  );
};
