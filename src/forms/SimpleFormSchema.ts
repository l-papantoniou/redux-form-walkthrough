const SimpleFormSchema = {
  label: "EmployeeForm",
  name: "EmployeeForm",
  initialValues: {},
  elements: [
    {
      label: "Όνομα",
      name: "firstName",
      type: "text",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: true,
      },
    },
    {
      label: "Επώνυμο",
      name: "lastName",
      type: "text",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: true,
      },
    },
    {
      label: "Ημερομηνία Γέννησης ",
      name: "birthDate",
      type: "date",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: false,
      },
    },
    {
      label: "ΑΦΜ",
      name: "afm",
      type: "text",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: false,
      },
    },

    {
      label: "Φύλλο",
      name: "sex",
      type: "radios",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: {
          paddingLeft: 2,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
          marginBottom: 1,
        },
        options: [
          { value: "1", label: "Άνδρας" },
          { value: "2", label: "Γυναίκα" },
        ],
        row: true,
      },
      validation: {
        readOnly: false,
        disabled: false,
        required: false,
      },
    },
  ],
};

export default SimpleFormSchema;
