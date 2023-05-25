import React from 'react';
import { TableHeaderProps } from '../../../models/table.model';
import styles from './TableHeader.module.scss';
import TableCell from '../../../atoms/tableElements/TableCell/TableCell';

const TableHeader: React.FC<TableHeaderProps> = ({ cells }) => {
  return (
    <thead className={styles.wrapper}>
      <tr>
        {cells.map((cell, index) => (
          <TableCell key={index} cell={cell} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
