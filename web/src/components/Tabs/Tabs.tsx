import { Box, Tabs, Tab, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import React, { SyntheticEvent, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TabsComponent: React.FC<{ titles: string[] }> = ({ titles }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="inherit"
        variant="standard"
        centered
      >
        {titles.map((title: string, index: number) => (
          <Tab
            key={index}
            label={title}
            sx={{
              fontWeight: 500,
              color: "black",
              textTransform: "none",

              "&.Mui-selected": {
                fontWeight: 700,
                color: "black",
              },
            }}
          />
        ))}
      </Tabs>
      <Box
        sx={{
          mx: "auto",
          borderBottom: 1,
          borderColor: "divider",
          width: {
            xs: "100%",
            sm: "600px",
            md: "800px",
            lg: "1000px",
            xl: "1200px",
          },
        }}
      />
      <Box
        my={5}
        display="flex"
        sx={{
          width: {
            xs: "100%",
            sm: "600px",
            md: "800px",
            lg: "1000px",
            xl: "1200px",
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            borderRadius: "8px",
            textTransform: "none",
            height: "45px",
            fontWeight: 700,
            backgroundColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#006666",
            },
            color: "black",
          }}
        >
          Filters
        </Button>
        <Button
          component={RouterLink}
          to="/request/create"
          variant="contained"
          color="primary"
          sx={{
            width: "250px",
            borderRadius: "8px",
            textTransform: "none",
            height: "45px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            ml: "auto",
          }}
        >
          Post a collaboration request
        </Button>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    maxWidth: "700px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
});

export default TabsComponent;
