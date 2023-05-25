import React from 'react';
import { TableCellProps } from '../../../models/table.model';
import styles from './TableCell.module.scss';

interface CellProps {
  cell: TableCellProps;
}

const TableCell: React.FC<CellProps> = ({ cell }) => {
  const getCellAlignStyle = (align: TableCellProps['align']) => {
    return align === 'center'
      ? styles.alignCenter
      : align === 'right'
      ? styles.alignRight
      : styles.alignLeft;
  };

  return cell.type === 'header' ? (
    <th className={getCellAlignStyle(cell.align)}>
      <span className={cell.isNumberValue ? styles.monospaceFont : undefined}>
        {cell.content}
      </span>
    </th>
  ) : (
    <td className={getCellAlignStyle(cell.align)}>
      <span className={cell.isNumberValue ? styles.monospaceFont : undefined}>
        {cell.content}
      </span>
    </td>
  );
};

export default TableCell;
