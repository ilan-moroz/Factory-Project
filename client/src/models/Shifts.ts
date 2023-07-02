export interface Shift {
  _id: string;
  date: string;
  startTime: number;
  endTime: number;
  employeeIds: string[]; // Array of employee IDs assigned to the shift
}
