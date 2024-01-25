import axios from "axios";
import { createContext, useContext } from "react";

const port = 3002;

const getEmployee = (employeeId) => {
  return axios.get(`http://localhost:${port}/getEmployee`, {
    params: {
      employeeId: employeeId,
    },
  });
};

const editEmployee = (employee) => {
  return axios.put(`http://localhost:${port}/updateEmployee`, {
    headers: {
      Authorization: `Bearer sd`,
    },
    employee: employee,
  });
};

const deleteEmployee = (employeeId) => {
  return axios.post(`http://localhost:${port}/deleteEmployee`, {
    headers: {
      Authorization: `Bearer sd`,
    },
    employeeId: employeeId,
  });
};

const EmployeeContext = createContext({
  getEmployee: getEmployee,
  editEmployee: editEmployee,
  deleteEmployee: deleteEmployee,
});

export const EmployeeProvider = (props) => {
  const value = {
    getEmployee: props.getEmployee || getEmployee,
    editEmployee: props.editEmployee || editEmployee,
    deleteEmployee: props.deleteEmployee || deleteEmployee,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {props.children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeService = () => {
  return useContext(EmployeeContext);
};
