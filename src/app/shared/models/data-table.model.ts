export interface CarTableState {
  tableData: any[];
  sortDirection: string;
  sortKey: string;
};

export interface HeaderRowItem {
  displayName: string;
  key: string;
  hasSort: boolean;
};
