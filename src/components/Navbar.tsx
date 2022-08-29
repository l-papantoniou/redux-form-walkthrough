import React from "react";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { AppBar, Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import DarkMode from "../themes/DarkMode";
import Grid from "@material-ui/core/Grid";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 2, paddingTop: 7 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ΛΙΣΤΑ ΥΠΑΛΛΗΛΩΝ
            </Typography>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="success"
                startIcon={<PersonAddAlt1Icon />}
                onClick={() => navigate("/employees/new")}
              >
                ΠΡΟΣΘΗΚΗ ΥΠΑΛΛΗΛΟΥ
              </Button>
            </Grid>
            <DarkMode />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
