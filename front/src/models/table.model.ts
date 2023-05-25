export interface TableCellProps {
  name: string;
  content: number | string | undefined | null;
  isNumberValue: boolean;
  align: 'center' | 'right' | 'left';
  type: 'header' | 'body';
}

export interface TableComponentProps {
  numberOfElementsToShow?: number;
  header: TableCellProps[];
  body: Array<Array<TableCellProps>>;
}

export interface TableHeaderProps {
  cells: TableCellProps[];
}

export interface TableBodyProps {
  lines: Array<Array<TableCellProps>>;
}
