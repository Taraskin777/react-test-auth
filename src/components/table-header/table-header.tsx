import {
  TableHeaderWrapper,
  Name,
  Phone,
  Address,
  Birthday,
  Email,
} from "./styled";

export const TableHeader = ():JSX.Element => {
  return (
    <TableHeaderWrapper>
      <Name>Name</Name>
      <Phone>Phone number</Phone>
      <Address>Address</Address>
      <Birthday>Birthday date</Birthday>
      <Email>Email</Email>
    </TableHeaderWrapper>
  );
};
