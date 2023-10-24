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
  console.log(pages);

  useEffect(() => {
    fetch("https://technical-task-api.icapgroupgmbh.com/api/table/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (data && data?.count > 0) {
      setPages(Math.ceil(data.count / 10));
    }
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <div>Pages: {pages}</div>
      <Link href={data.next}>Next</Link>
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
    </Table>
  );
};
