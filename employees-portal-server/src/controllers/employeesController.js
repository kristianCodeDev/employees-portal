const employees = require("../db/employeesDB.json");

module.exports = (app) => {
  app.get("/getEmployees", (req, res) => {
    const search = req.query.search;
    const searchCatagory = req.query.searchCatagory;
    const page = req.query.page;

    const pageCount = (Number(page) + 1) * 5;

    const allResult = search
      ? searchCatagory === "name"
        ? employees.filter((el) =>
            new RegExp(`^${search.toLowerCase()}.*`).test(
              (el.firstName + " " + el.lastName).toLowerCase()
            )
          )
        : employees.filter((el) =>
            new RegExp(`^${search.toLowerCase()}.*`).test(
              el[searchCatagory].toLowerCase()
            )
          )
      : employees;

    const filteredResult = allResult.filter(
      (_el, index) => pageCount > index && pageCount - 5 <= index
    );

    res.send({
      employees: filteredResult,
      pages:
        allResult.length % 5 > 0
          ? (allResult.length / 5) | 0
          : allResult.length === 0
          ? 0
          : allResult.length / 5 - 1,
      count: allResult.length,
    });
  });

  app.get("/getEmployee", (req, res) => {
    const employeeId = Number(req.query.employeeId);

    res.send(employees.find((el) => el.employeeId === employeeId));
  });

  app.post("/deleteEmployee", (req, res) => {
    const employeeId = req.body.employeeId;

    employees.some((el, index) => {
      if (el.employeeId === employeeId) {
        employees.splice(index, 1);
        return true;
      }
    });

    res.send("Deleted Employee!");
  });

  app.put("/updateEmployee", (req, res) => {
    const employee = req.body.employee;

    if (!isNaN(employee.customerSatisfaction) && !isNaN(employee.experience)) {
      employees.some((el, index) => {
        if (el.employeeId === employee.employeeId) {
          employees.splice(index, 1);
          employees.push(employee);
          return true;
        }
      });

      res.send("Updated Employee!");
    } else
      res
        .status(400)
        .send("Customer Satisfaction or Years of Experience is not a number");
  });
};
