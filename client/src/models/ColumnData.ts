export interface ColumnData<T> {
  dataKey: keyof T;
  label: string;
  numeric?: boolean;
  width: number;
}
