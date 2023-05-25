import React from 'react';
import { TableBodyProps } from '../../../models/table.model';
import styles from './TableBody.module.scss';
import TableCell from '../../../atoms/tableElements/TableCell/TableCell';

const TableBody: React.FC<TableBodyProps> = ({ lines }) => {
  return (
    <tbody className={styles.wrapper}>
      {lines?.map((lineCells, index) => (
        <tr>
          {lineCells.map((cell, index) => (
            <TableCell key={index} cell={cell} />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
