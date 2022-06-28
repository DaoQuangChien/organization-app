import { Action, Employee, IEmployeeOrgApp } from "./data";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  undoStack: Action[] = [];
  redoStack: Action[] = [];

  constructor(employee: Employee) {
    this.ceo = employee;
  }

  move(employeeID: number, supervisorID: number) {
    const findEmployee = (
      employee: Employee,
      id: number
    ): Employee | undefined => {
      if (employee.uniqueId === id) {
        return employee;
      }
      for (let i = 0; i < employee.subordinates.length; i++) {
        const sub = findEmployee(employee.subordinates[i], id);

        if (sub) {
          return sub;
        }
      }
      if (employee.uniqueId !== id) {
        return undefined;
      }
    };
    const findSupervisorOfEmployee = (
      employee: Employee,
      id: number
    ): Employee | undefined => {
      if (employee.subordinates.find((sub) => sub.uniqueId === id)) {
        return employee;
      }
      for (let i = 0; i < employee.subordinates.length; i++) {
        const sub = findSupervisorOfEmployee(employee.subordinates[i], id);

        if (sub) {
          return sub;
        }
      }
      if (!employee.subordinates.length) {
        return undefined;
      }
    };
    const fromSupervisor = findSupervisorOfEmployee(this.ceo, employeeID);
    const toSupervisor = findEmployee(this.ceo, supervisorID);
    const moveEmployee = findEmployee(this.ceo, employeeID);

    if (employeeID === 1) {
      console.log("Can't move the CEO");
      return;
    }
    if (!toSupervisor || !moveEmployee) {
      console.log("Something is wrong!");
      return;
    }
    const action: Action = {
      ...(fromSupervisor && {
        fromSupervisor,
        fromSupervisorsSubordinates: fromSupervisor.subordinates,
      }),
      toSupervisor,
      toSupervisorSubordinates: toSupervisor.subordinates,
      moveEmployee,
      moveEmployeeSubordinates: moveEmployee.subordinates,
    };

    if (fromSupervisor) {
      fromSupervisor.subordinates = fromSupervisor.subordinates
        .filter((sub) => sub.uniqueId !== employeeID)
        .concat(moveEmployee.subordinates);
    }
    moveEmployee.subordinates = [];
    toSupervisor.subordinates = toSupervisor.subordinates.concat([
      moveEmployee,
    ]);
    this.undoStack.push(action);
    this.redoStack = [];
  }

  undo() {
    if (this.undoStack.length) {
      const action = this.undoStack.pop()!;
      const {
        fromSupervisor,
        fromSupervisorsSubordinates,
        toSupervisor,
        toSupervisorSubordinates,
        moveEmployee,
        moveEmployeeSubordinates,
      } = action;

      if (fromSupervisor && fromSupervisorsSubordinates) {
        fromSupervisor.subordinates = fromSupervisorsSubordinates;
      }
      toSupervisor.subordinates = toSupervisorSubordinates;
      moveEmployee.subordinates = moveEmployeeSubordinates;
      this.redoStack.push(action);
    }
  }

  redo() {
    if (this.redoStack.length) {
      const action = this.redoStack.pop()!;
      const { fromSupervisor, toSupervisor, moveEmployee } = action;

      if (fromSupervisor) {
        fromSupervisor.subordinates = fromSupervisor.subordinates
          .filter((sub) => sub.uniqueId !== moveEmployee.uniqueId)
          .concat(moveEmployee.subordinates);
      }
      moveEmployee.subordinates = [];
      toSupervisor.subordinates = toSupervisor.subordinates.concat([
        moveEmployee,
      ]);
      this.undoStack.push(action);
    }
  }
}

/* *********************************************************************************************************** */
// Init data

const ceo: Employee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      uniqueId: 2,
      name: "Sarah Donald",
      subordinates: [
        {
          uniqueId: 6,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 11,
              name: "Mary Blue",
              subordinates: [],
            },
            {
              uniqueId: 12,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 14,
                  name: "Tina Teff",
                  subordinates: [
                    {
                      uniqueId: 15,
                      name: "Will Turner",
                      subordinates: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      uniqueId: 3,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 7,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 13,
              name: "Thomas Brown",
              subordinates: [],
            },
          ],
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
      ],
    },
    {
      uniqueId: 4,
      name: "Bruce Willis",
      subordinates: [],
    },
    {
      uniqueId: 5,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 10,
          name: "Sophie Turner",
          subordinates: [],
        },
      ],
    },
  ],
};

const app = new EmployeeOrgApp(ceo);

app.move(12, 3); // move Bob Saget -> Tyler Simpson
app.move(7, 4); // move Harry Tobs -> Bruce Willis
app.undo();
// app.undo();
app.move(14, 4); // move Tina Teff -> Bruce Willis
app.redo();
app.undo();
// app.redo();

/* *********************************************************************************************************** */
