import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import MainLayout from "./components/MainLayout/MainLayout";
import Employee from "./pages/Employee/Employee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import LandingPage from "./pages/LandingPage/LandingPage";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route element={<LandingPage></LandingPage>} path="/" />
            <Route element={<Employees />} path="/employees" />
            <Route element={<Employee />} path="/employee" />
            <Route element={<EditEmployee />} path="/edit-employee" />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
};

export default App;
