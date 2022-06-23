export interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

export interface IEmployeeOrgApp {
  ceo: Employee;

  move(employeeID: number, supervisorID: number): void;

  undo(): void;

  redo(): void;
}

export interface Action {
  fromSupervisor?: Employee;
  fromSupervisorsSubordinates?: Employee[];
  toSupervisor: Employee;
  toSupervisorSubordinates: Employee[];
  moveEmployee: Employee;
  moveEmployeeSubordinates: Employee[];
}

export const data: Employee[] = [
  // {
  //   uniqueId: 1,
  //   name: "Mark Zuckerberg",
  //   subordinates: []
  // },
  {
    uniqueId: 2,
    name: "Sarah Donald",
    subordinates: [],
  },
  {
    uniqueId: 3,
    name: "Tyler Simpson",
    subordinates: [],
  },
  {
    uniqueId: 4,
    name: "Bruce Willis",
    subordinates: [],
  },
  {
    uniqueId: 5,
    name: "Georgina Flangy",
    subordinates: [],
  },
  {
    uniqueId: 6,
    name: "Cassandra Reynolds",
    subordinates: [],
  },
  {
    uniqueId: 7,
    name: "Harry Tobs",
    subordinates: [],
  },
  {
    uniqueId: 8,
    name: "George Carrey",
    subordinates: [],
  },
  {
    uniqueId: 9,
    name: "Gary Styles",
    subordinates: [],
  },
  {
    uniqueId: 10,
    name: "Sophie Turner",
    subordinates: [],
  },
  {
    uniqueId: 11,
    name: "Mary Blue",
    subordinates: [],
  },
  {
    uniqueId: 12,
    name: "Bob Saget",
    subordinates: [],
  },
  {
    uniqueId: 13,
    name: "Thomas Brown",
    subordinates: [],
  },
  {
    uniqueId: 14,
    name: "Tina Teff",
    subordinates: [],
  },
  {
    uniqueId: 15,
    name: "Will Turner",
    subordinates: [],
  },
];

export const structure = {
  1: [2, 3, 4, 5],
  2: [6],
  3: [7, 8, 9],
  5: [10],
  6: [11, 12],
  7: [13],
  12: [14],
  14: [15],
};
