import React from 'react';
import { Table } from 'reactstrap';
import { TableComponentProps } from '../../models/table.model';
import TableHeader from '../../molecules/table/TableHeader/TableHeader';
import TableBody from '../../molecules/table/TableBody/TableBody';

const TableComponent: React.FC<TableComponentProps> = ({
  numberOfElementsToShow,
  header,
  body,
}) => {
  return (
    <Table>
      <TableHeader cells={header} />
      <TableBody lines={body} />
    </Table>
  );
};

export default TableComponent;
