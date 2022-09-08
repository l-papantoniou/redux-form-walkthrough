import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, CardContent, Typography } from "@mui/material";

import UpdateIcon from "@mui/icons-material/Update";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../index.css"; // Import css
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import
import { getEmployees } from "../reducers/EmployeeReducer";
import { deleteEmployee } from "../reducers/EmployeeReducer";
import { RootState } from "../store";

const ListEmployees = ({ setAuth }) => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state: RootState) => state.employees.entities);
  const countPages = useSelector(
    (state: RootState) => state.employees.countPages
  );

  const HandleNextPage = () => {
    if (page < countPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const HandlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const checkEmptyPage = () => {
    if (employees.length === 0 && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  //delete confirmation popup//
  const deleteConf = (id: number) => {
    confirmAlert({
      title: "Επιβεβαιωση διαγραφής",
      message: "Είστε σίγουρος/η, οτι θέλετε να διαγράψετε τον χρήστη;",
      buttons: [
        {
          label: "Nαι",
          onClick: async () => {
            await dispatch(deleteEmployee(id));
            dispatch(getEmployees(page));
            navigate("/");
          },
        },
        {
          label: "Όχι",
          onClick: () => navigate("/"),
        },
      ],
    });
  };

  //logout button function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  //logout button style
  const btnstyle = { margin: "8px 0" };

  useEffect(() => {
    dispatch(getEmployees(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    checkEmptyPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);

  console.log(employees);
  return (
    <Fragment>
      <Card
        style={{
          marginBottom: ".7rem",
          backgroundColor: "#1e272e",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ΟΝΟΜΑ</TableCell>
                  <TableCell align="center">ΕΠΩΝΥΜΟ</TableCell>
                  <TableCell align="center">ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ</TableCell>
                  <TableCell align="center">Α.Φ.Μ</TableCell>
                  <TableCell align="center">ΕΝΗΜΕΡΩΣΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
                  <TableCell align="center">ΔΙΑΓΡΑΦΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees &&
                  employees?.map((employee) => (
                    <TableRow
                      key={employee.id} // ??? //
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {employee.firstname}
                      </TableCell>
                      <TableCell align="center">{employee.lastname}</TableCell>
                      <TableCell align="center">
                        {" "}
                        {FormatBday(employee.birthdate)}
                      </TableCell>
                      <TableCell align="center">{employee.afm}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<UpdateIcon />}
                          onClick={() =>
                            navigate(`/employees/${employee.id}/edit`)
                          }
                        >
                          Ένημέρωση
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => deleteConf(employee.id)}
                        >
                          Διαγραφη
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography align="right" margin="0.5rem">
              <span> Σελίδα {page}η</span>
              <Button
                className="btn default"
                variant="outlined"
                disabled={page === 1 ? true : false}
                onClick={() => HandlePrevPage()}
                startIcon={<NavigateBeforeIcon />}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderColor: "#e7e7e7",
                  borderRadius: "65px",
                  marginLeft: "20px",
                  marginRight: "10px",
                }}
              ></Button>

              <Button
                className="btn default"
                variant="outlined"
                disabled={page >= countPages ? true : false}
                onClick={() => HandleNextPage()}
                startIcon={<NavigateNextIcon />}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderColor: "#e7e7e7",
                  borderRadius: "65px",
                }}
              ></Button>
            </Typography>
          </TableContainer>
        </CardContent>
      </Card>
      <Grid container justifyContent="center">
        <Button
          type="submit"
          color="error"
          variant="contained"
          style={btnstyle}
          onClick={logout}
        >
          Αποσυνδεση
        </Button>
      </Grid>
    </Fragment>
  );
};

export default ListEmployees;
