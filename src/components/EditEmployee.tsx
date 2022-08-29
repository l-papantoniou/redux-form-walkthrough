import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../forms/SimpleForm";
import SimpleForm from "../forms/SimpleForm";
import { loadEmployee } from "../reducers/EmployeeReducer";

const EditEmployee = (setAuth) => {
  const params = useParams();
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    if (params.id) {
      dispatch(loadEmployee(params.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return <SimpleForm isNew={false} id={params.id} />;
};
export default EditEmployee;
