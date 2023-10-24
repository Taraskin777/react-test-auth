import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  Users,
  Name,
  Phone,
  Address,
  Birthday,
  Email,
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
  const [pages, setPages] = useState<number | undefined>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const resultsPerPage = 10;

  useEffect(() => {
    // Виконуємо запит до серверу з врахуванням поточної сторінки та ліміту результатів
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
  }, [currentPage]); // Залежність включає поточну сторінку

  if (data === null) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(data.count / resultsPerPage); // Загальна кількість сторінок

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <Table>
      <div>Pages: {totalPages}</div>
      <Link href={data.next || "/"}>Next</Link>
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
            <button>Edit</button>
            <button>Save</button>
          </li>
        ))}
      </Users>
      <div>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{
              fontWeight: pageNumber === currentPage ? "bold" : "normal",
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </Table>
  );
};
