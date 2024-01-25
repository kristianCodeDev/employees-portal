import axios from "axios";
import { createContext, useContext } from "react";

const port = 3002;

const getSearch = (search, searchCatagory, page) => {
  return axios.get(`http://localhost:${port}/getEmployees`, {
    params: {
      search: search,
      searchCatagory: searchCatagory,
      page: page,
    },
  });
};

const EmployeesContext = createContext({
  getSearch: getSearch,
});

export const EmployeesProvider = (props) => {
  const value = {
    getSearch: props.getSearch || getSearch,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {props.children}
    </EmployeesContext.Provider>
  );
};

export const useEmployeesService = () => {
  return useContext(EmployeesContext);
};
