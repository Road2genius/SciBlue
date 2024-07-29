import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import TabsComponent from "../components/Tabs/Tabs";

const RequestsList: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Box className={classes.root}>
        <Typography variant="h4" fontWeight={700} color="#197278" mb={4}>
          Collaboration requests
        </Typography>
        <Box>
          <TabsComponent
            titles={[
              "All requests",
              "Requests you have answered",
              "Requests you have submitted",
            ]}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default RequestsList;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    marginLeft: "80px",
    maxWidth: "700px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
});
