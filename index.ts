import { data, structure, Action, Employee, IEmployeeOrgApp } from "./data";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  staff: Employee[] = [];
  undoStack: Action[] = [];
  redoStack: Action[] = [];

  constructor(employee: Employee) {
    this.ceo = employee;
    this.staff.push(employee);
  }

  addStaff(employee: Employee) {
    this.staff.push(employee);
  }

  move(employeeID: number, supervisorID: number) {
    const fromSupervisor = this.findSupervisorOfEmployee(employeeID);
    const toSupervisor = this.findEmployee(supervisorID);
    const moveEmployee = this.findEmployee(employeeID);

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
      fromSupervisor.subordinates = fromSupervisor.subordinates.concat(
        moveEmployee.subordinates
      );
    }
    moveEmployee.subordinates = [];
    toSupervisor.subordinates = toSupervisor.subordinates.concat([
      moveEmployee,
    ]);
    this.undoStack.push(action);
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
      const { toSupervisor, moveEmployee } = action;
      this.move(moveEmployee.uniqueId, toSupervisor.uniqueId);
    }
  }

  findEmployee(employeeID: number): Employee | undefined {
    const index = this.staff.findIndex(
      (employee) => employee.uniqueId === employeeID
    );

    return index === -1 ? undefined : this.staff[index];
  }

  findSupervisorOfEmployee(employeeID: number): Employee | undefined {
    const index = this.staff.findIndex(
      (employee) =>
        !!employee.subordinates.find((sub) => sub.uniqueId === employeeID)
    );

    return index === -1 ? undefined : this.staff[index];
  }

  printOrg() {
    console.log("-----Organization-----");
    const log = (employee: Employee, space: number = 0) => {
      if (!employee.subordinates.length) {
        console.log(`${" ".repeat(space)}-${employee.name}`);
      } else {
        console.log(`${" ".repeat(space)}-${employee.name}`);
        employee.subordinates.forEach((sub) => log(sub, space + 2));
      }
    };

    log(this.ceo);
  }

  clearStack() {
    this.undoStack = [];
    this.redoStack = [];
  }
}

/* *********************************************************************************************************** */
// Init data

const ceo: Employee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [],
};

const app = new EmployeeOrgApp(ceo);

data.forEach((employee) => app.addStaff(employee));
Object.entries(structure).forEach(([supervisorID, subordinateIDs]) =>
  subordinateIDs.forEach((employeeID) =>
    app.move(employeeID, Number(supervisorID))
  )
);
// app.printOrg();
/*
-----Organization-----
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
        -Tina Teff
          -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
*/
app.clearStack();

///////

app.move(12, 3); // move Bob Saget -> Tyler Simpson
// app.printOrg();
/*
-----Organization-----
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
      -Tina Teff
        -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
    -Bob Saget
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
*/
app.undo();
// app.printOrg();
/*
-----Organization-----
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
        -Tina Teff
          -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner
*/
app.redo();
app.printOrg();
/*
-----Organization-----
-Mark Zuckerberg
  -Sarah Donald
    -Cassandra Reynolds
      -Mary Blue
      -Bob Saget
      -Tina Teff
        -Will Turner
  -Tyler Simpson
    -Harry Tobs
      -Thomas Brown
    -George Carrey
    -Gary Styles
    -Bob Saget
  -Bruce Willis
  -Georgina Flangy
    -Sophie Turner

*/

/* *********************************************************************************************************** */
