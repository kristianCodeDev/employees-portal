import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@mui/base";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { useEmployeeService } from "../../services/EmployeeService";
import styles from "./Employee.module.css";

const Employee = () => {
  const [employee, setEmployee] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const employeeService = useEmployeeService();

  useEffect(() => {
    employeeService
      .getEmployee(location.state.employeeId)
      .then((res) => setEmployee(res.data))
      .catch(() => setShowError(true));
  }, []);

  const deleteEmployee = (employeeId) => {
    employeeService
      .deleteEmployee(employeeId)
      .then(() => {
        setShowError(false);

        navigate("/employees", { state: { showSuccess: true } });
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "4rem" }}>
        Employee Details
      </Typography>
      <div className={`${styles["container-center"]}`}>
        {showError ? (
          <Alert severity="error" sx={{ marginBottom: "2rem" }}>
            Something went wrong!
          </Alert>
        ) : (
          ""
        )}
      </div>
      <div className={`${styles["container-center"]}`}>
        <Card sx={{ maxWidth: 345 }}>
          <AccountBoxRoundedIcon sx={{ fontSize: "6rem" }} />
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "0.8rem" }}
            >
              First Name: {employee.firstName}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "0.8rem" }}
            >
              Last Name: {employee.lastName}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "0.8rem" }}
            >
              Position: {employee.position}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "0.8rem" }}
            >
              Skills: {employee.skills?.toString()}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "0.8rem" }}
            >
              Customer Satisfaction: {employee.customerSatisfaction}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "0.8rem" }}
            >
              Description
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employee.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button size="small" onClick={() => navigate("/employees")}>
              Back
            </Button>
            <Button
              size="small"
              style={{
                backgroundColor: "#dddddd",
              }}
              variant="contained"
              onClick={() =>
                navigate("/edit-employee", {
                  state: { employee: employee },
                })
              }
            >
              Edit
            </Button>
            <Button
              size="small"
              style={{
                backgroundColor: "#ff4136",
              }}
              onClick={() => setOpenDialog(true)}
            >
              Delete
            </Button>
          </CardActions>
          <Dialog open={openDialog} aria-describedby="alert-dialog-description">
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>No</Button>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                  deleteEmployee(employee.employeeId);
                }}
                style={{
                  backgroundColor: "#ff4136",
                }}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </div>
    </>
  );
};

export default Employee;
