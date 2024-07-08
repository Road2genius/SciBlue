import {
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import KeywordInput from "../components/KeywordInput/KeywordInput";
import TagInput from "../components/TagInput/TagInput";
import {
  chipData,
  chipDataCollaboration,
  chipDataCollaborationDuration,
  chipDataOrganization,
  chipDataStatus,
  defaultTags,
} from "../data/chipData";
import { formData } from "../types/formData.type";

const Signup: React.FC = () => {
  const classes = useStyles();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [formState, setFormState] = useState<formData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationName: "",
    institution: "",
    address: "",
    city: "",
    country: "",
    professionalActivity: "",
  });

  const handleChipClick = (label: string): void => {
    setSelectedChips((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((chip) => chip !== label)
        : [...prevSelected, label]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h4" fontWeight={700} color="#197278">
          Sign up
        </Typography>

        <Typography variant="body1" fontWeight={700} mb={4}>
          * information requested
        </Typography>

        <Typography variant="h5" fontWeight={600} mb={4}>
          General information
        </Typography>

        <Typography variant="body1" fontWeight={600}>
          First name *
        </Typography>
        <TextField
          fullWidth
          name="firstName"
          placeholder="Enter first name"
          variant="outlined"
          type="text"
          sx={{ marginBottom: "20px" }}
          value={formState.firstName}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Last name *
        </Typography>
        <TextField
          fullWidth
          name="lastName"
          placeholder="Enter last name"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.lastName}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Mail address *
        </Typography>
        <TextField
          fullWidth
          name="email"
          placeholder="Enter mail address"
          type="email"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.email}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Password *
        </Typography>
        <TextField
          fullWidth
          name="password"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.password}
          onChange={handleInputChange}
        />

        <Typography variant="h5" fontWeight={600} mt={4}>
          Professional activity and expertise
        </Typography>

        <Typography variant="body1" fontWeight={600} mt={4}>
          What type of organization are you affiliated with?
        </Typography>

        <Box className={classes.chipContainer}>
          {chipData.map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() => handleChipClick(label)}
              sx={{
                backgroundColor: selectedChips.includes(label)
                  ? "#C8E6C9"
                  : "transparent",
                color: selectedChips.includes(label) ? "#000" : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>

        <Typography variant="body1" fontWeight={600}>
          Organization name *
        </Typography>
        <TextField
          fullWidth
          name="organizationName"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.organizationName}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Institution (if relevant)
        </Typography>
        <TextField
          fullWidth
          name="institution"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.institution}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Address *
        </Typography>
        <TextField
          fullWidth
          name="address"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.address}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          City *
        </Typography>
        <TextField
          fullWidth
          name="city"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.city}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Country *
        </Typography>
        <TextField
          fullWidth
          name="country"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.country}
          onChange={handleInputChange}
        />

        <Typography variant="body1" fontWeight={600}>
          Describe in a few words your professional activity (e.g your research
          topic for a laboratory, the actions carried out by your NGO, ...)
        </Typography>
        <TextField
          fullWidth
          name="professionalActivity"
          type="text"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          value={formState.professionalActivity}
          onChange={handleInputChange}
        />

        <KeywordInput />

        <TagInput
          label="Which field(s) might your professional activity be relevant to?"
          placeholder="+ add your tag"
          defaultTags={defaultTags}
        />
        <TagInput
          label="Methods and specific techniques"
          placeholder="+ add a method or a precise technique (e.g imaging, computational models and simulation, ...)"
          defaultTags={[]}
        />
        <TagInput
          label="Equipment"
          placeholder="+ add a particular equipment (e.g. UHPLC system, ...)"
          defaultTags={[]}
        />
        <TagInput
          label="Models"
          placeholder="+ add a model (e.g. particular mouse model, ...)"
          defaultTags={[]}
        />
        <TagInput
          label="Chemical and biological products"
          placeholder="+ add a product (e.g. antibodies, cells, small molecules, ...)"
          defaultTags={[]}
        />
        <TagInput
          label="Any other skill that you would like to mention"
          placeholder="+ add a skill"
          defaultTags={[]}
        />
      </Box>

      <Divider
        variant="middle"
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
        }}
      />
      <Box className={classes.root}>
        <Typography variant="h4" fontWeight={600} mt={4}>
          Inform the community for what kind of collaboration would you like to
          be contacted for :
        </Typography>

        <Typography variant="body1" fontWeight={600} mt={4}>
          Type of collaboration you are interested in
        </Typography>

        <Box className={classes.chipContainer}>
          {chipDataCollaboration.map((collaboration) => (
            <Chip
              key={collaboration}
              label={collaboration}
              onClick={() => handleChipClick(collaboration)}
              sx={{
                backgroundColor: selectedChips.includes(collaboration)
                  ? "#C8E6C9"
                  : "transparent",
                color: selectedChips.includes(collaboration) ? "#000" : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>

        <Typography variant="body1" fontWeight={600}>
          With what type of organization would you be willing to collaborate?
        </Typography>

        <Box className={classes.chipContainer}>
          {chipDataOrganization.map((organization) => (
            <Chip
              key={organization}
              label={organization}
              onClick={() => handleChipClick(organization)}
              sx={{
                backgroundColor: selectedChips.includes(organization)
                  ? "#C8E6C9"
                  : "transparent",
                color: selectedChips.includes(organization) ? "#000" : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>

        <Typography variant="body1" fontWeight={600}>
          Project’s progress status
        </Typography>

        <Box className={classes.chipContainer}>
          {chipDataStatus.map((status) => (
            <Chip
              key={status}
              label={status}
              onClick={() => handleChipClick(status)}
              sx={{
                backgroundColor: selectedChips.includes(status)
                  ? "#C8E6C9"
                  : "transparent",
                color: selectedChips.includes(status) ? "#000" : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>

        <Typography variant="body1" fontWeight={600}>
          Collaboration duration
        </Typography>

        <Box className={classes.chipContainer}>
          {chipDataCollaborationDuration.map((collabDuration) => (
            <Chip
              key={collabDuration}
              label={collabDuration}
              onClick={() => handleChipClick(collabDuration)}
              sx={{
                backgroundColor: selectedChips.includes(collabDuration)
                  ? "#C8E6C9"
                  : "transparent",
                color: selectedChips.includes(collabDuration) ? "#000" : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            borderRadius: "8px",
            textTransform: "none",
            height: "50px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            alignSelf: "flex-end",
          }}
          onClick={() => console.log("Validate", formState)}
        >
          Validate
        </Button>
      </Box>
    </>
  );
};

export default Signup;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    marginLeft: "80px",
    maxWidth: "720px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  chip: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid black",
  },
  selectedChip: {
    backgroundColor: "#C8E6C9",
  },
});
