import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import InputEmployee from "./components/InputEmployee";
import EditEmployee from "./components/EditEmployee";
import ListEmployees from "./components/ListEmployees";
import ButtonAppBar from "./components/Navbar";
import Login from "./components/Login";

//client
const client = axios.create({
  baseURL: "http://localhost:5000/",
});

const App = () => {
  //authentication proccess
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage?.token?.length > 0 ? true : false
  );

  const setAuth = (boolean) => {
    return setIsAuthenticated(boolean);
  };

  //We hit the jwtAuth endpoint to check if the person is still verified
  const checkAuthenticated = async () => {
    try {
      await client
        .post("http://localhost:5000/auth/verify", {
          headers: { token: localStorage.token },
        })
        .then((res) => {
          res.status === 200
            ? setIsAuthenticated(true)
            : setIsAuthenticated(false);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  });
  console.log(isAuthenticated);

  return (
    <Router>
      <Fragment>
        <Container fixed>
          <ButtonAppBar />
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <ListEmployees setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/employees/new"
              element={
                isAuthenticated ? (
                  <InputEmployee setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/employees/:id/edit"
              element={
                isAuthenticated ? (
                  <EditEmployee setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Container>
      </Fragment>
    </Router>
  );
};

export default App;
