//format birthday date //
const FormatBday = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-CA");
};

export interface IRootState {
  employees?: any;
  isNew?: boolean;
  id?: number | string | null;
}

const mapStateToProps = (state: IRootState) => {
  return {
    initialValues: {
      firstName: state.employees.loadEmployee.firstname,
      lastName: state.employees.loadEmployee.lastname,
      birthDate: FormatBday(state.employees.loadEmployee.birthdate),
      afm: state.employees.loadEmployee.afm,
    },
  };
};

export default mapStateToProps;
