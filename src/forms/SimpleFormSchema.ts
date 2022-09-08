const SimpleFormSchema = {
  label: "Simple Form",
  name: "Simple Form",
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
  ],
};

export default SimpleFormSchema;
