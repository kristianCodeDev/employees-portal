import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { useEmployeesService } from "../../services/EmployeesService";
import {
  Alert,
  InputLabel,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";
import styles from "./Employees.module.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [showError, setShowError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCatagory, setSearchCatagory] = useState("name");
  const [allCount, setAllCount] = useState(0);

  const employeesService = useEmployeesService();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    searchEmployees("", 0);
  }, []);

  const searchEmployees = (value, page) => {
    setPagesCount(0);

    employeesService
      .getSearch(value, searchCatagory, page)
      .then((res) => {
        setEmployees(res.data.employees);
        setAllPages(res.data.pages);
        setAllCount(res.data.count);
      })
      .catch(() => setShowError(true));
  };

  return (
    <>
      {showError ? (
        <Alert severity="error" sx={{ marginBottom: "2rem" }}>
          The initial data didn't load correctly!
        </Alert>
      ) : (
        <>
          {location.state?.showSuccess ? (
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Alert sx={{ marginBottom: "2rem", width: "50%" }}>
                Successfully deleted employee!
              </Alert>
            </Container>
          ) : (
            ""
          )}
          <Typography variant="h4" sx={{ marginBottom: "4rem" }}>
            Employees List
          </Typography>
          <div className={`${styles["container-search"]}`}>
            <TextField
              id="standard-basic"
              placeholder="Search..."
              variant="standard"
              sx={{ width: "75%" }}
              onChange={(e) => {
                setSearch(e.target.value);
                searchEmployees(e.target.value, 0);
              }}
              value={search}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchCatagory}
                label="Age"
                onChange={(e) => setSearchCatagory(e.target.value)}
              >
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"position"}>Position</MenuItem>
                <MenuItem value={"experience"}>Years of Experience</MenuItem>
                <MenuItem value={"customerSatisfaction"}>
                  Customer Satisfaction
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Years of Experience</TableCell>
                  <TableCell align="right">Skills</TableCell>
                  <TableCell align="right">Customer Satisfaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((el) => (
                  <TableRow
                    key={el.employeeId}
                    onClick={() =>
                      navigate("/employee", {
                        state: { employeeId: el.employeeId },
                      })
                    }
                    sx={{ cursor: "pointer" }}
                    hover
                  >
                    <TableCell>
                      {el.firstName} {el.lastName}
                    </TableCell>
                    <TableCell align="right">{el.position}</TableCell>
                    <TableCell align="right">{el.experience}</TableCell>
                    <TableCell align="right">{el.skills.toString()}</TableCell>
                    <TableCell align="right">
                      {el.customerSatisfaction}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={5}
                    count={allCount}
                    rowsPerPage={5}
                    page={pagesCount}
                    nextIconButtonProps={{
                      disabled: pagesCount === allPages,
                    }}
                    onPageChange={(_e, page) => {
                      searchEmployees(search, page);
                      setPagesCount(page);
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Employees;
