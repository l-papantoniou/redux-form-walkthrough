import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";

// Actions

//get employees
export const getEmployees = createAsyncThunk(
  "employees/fetch",
  async (page: number) => {
    const requestUrl = `http://localhost:5000/employees?page=${page}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

//create employee
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (entity: EmployeeInterface) => {
    const requestUrl = "http://localhost:5000/employee";
    const response = await axios.post(requestUrl, entity);
    console.log(response);
    return response;
  }
);

//delete employee
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id: number) => {
    const requestUrl = `http://localhost:5000/employees/${id}`;
    return await axios.delete(requestUrl);
  }
);

//update employee
export const updateEmployee = createAsyncThunk(
  "employee/edit",
  async (entity: EmployeeInterface) => {
    console.log(entity);
    const requestUrl = `http://localhost:5000/employees/${entity.id}`;
    const response = await axios.put(requestUrl, entity);
    return response;
  }
);

//load employee
export const loadEmployee = createAsyncThunk(
  "employee/load",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/employees/${id}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

const initialState = {
  entities: [],
  totalEmployees: 0,
  countPages: 0,
  pageNumber: 0,
  loadEmployee: {},
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearUpdateEmployee: (state) => {
      state.loadEmployee = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.entities = action.payload.data.employees;
        state.totalEmployees = action.payload.data.totalEmployees;
        state.countPages = action.payload.data.countPages;
        state.pageNumber = action.payload.data.pageNumber;
      })
      .addCase(loadEmployee.fulfilled, (state, action) => {
        state.loadEmployee = action.payload.data;
      });
  },
});

export const employeeActions = employeesSlice.actions;

export default employeesSlice.reducer;
