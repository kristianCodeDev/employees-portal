import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@mui/base";
import { TextField, Alert, Typography } from "@mui/material";
import { useEmployeeService } from "../../services/EmployeeService";
import styles from "./EditEmployee.module.css";

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeService = useEmployeeService();

  const [employee, setEmployee] = useState(location.state.employee);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const editEmployee = () => {
    employeeService
      .editEmployee(employee)
      .then(() => {
        setShowError(false);
        setShowSuccess(true);
      })
      .catch(() => {
        setShowSuccess(false);
        setShowError(true);
      });
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "4rem" }}>
        Edit Employee
      </Typography>
      <div className={`${styles["container-center"]}`}>
        <div className={`${styles["container-items"]}`}>
          {showSuccess ? (
            <Alert sx={{ marginBottom: "2rem" }}>
              Successfully updated employee!
            </Alert>
          ) : (
            ""
          )}
          {showError ? (
            <Alert severity="error" sx={{ marginBottom: "2rem" }}>
              The employee wasn't saved correctly!
            </Alert>
          ) : (
            ""
          )}
          <TextField
            label="Fist Name"
            variant="outlined"
            onChange={(e) =>
              setEmployee((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }))
            }
            value={employee.firstName}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            onChange={(e) =>
              setEmployee((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }))
            }
            value={employee.lastName}
          />
          <TextField
            label="Position"
            variant="outlined"
            onChange={(e) =>
              setEmployee((prevState) => ({
                ...prevState,
                position: e.target.value,
              }))
            }
            value={employee.position}
          />
          <TextField
            label="Experience"
            variant="outlined"
            onChange={(e) => {
              if (/^\d*\.?\d*$/.test(e.target.value) && e.target.value !== ".")
                setEmployee((prevState) => ({
                  ...prevState,
                  experience: e.target.value,
                }));
            }}
            value={employee.experience}
          />
          <TextField
            label="Customer Satisfaction"
            variant="outlined"
            onChange={(e) => {
              if (/^\d*\.?\d*$/.test(e.target.value) && e.target.value !== ".")
                setEmployee((prevState) => ({
                  ...prevState,
                  customerSatisfaction: e.target.value,
                }));
            }}
            value={employee.customerSatisfaction}
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) =>
              setEmployee((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            value={employee.description}
          />
        </div>
      </div>
      <div className={`${styles["mt-3"]}`}>
        <Button
          size="small"
          onClick={() =>
            navigate("/employee", {
              state: { employeeId: employee.employeeId },
            })
          }
        >
          Back
        </Button>
        <Button
          size="small"
          className={`${styles["ml-2"]}`}
          style={{ backgroundColor: "#baf8c1" }}
          onClick={editEmployee}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default EditEmployee;
