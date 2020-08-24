import { EmployeePosition } from './employee-position';

export interface Employee {
    employeeID: number;
    name: string;
    surname: string;
    username?: string;
    positions?: EmployeePosition[];
}
