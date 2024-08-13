import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
  Chip,
  PaperProps,
  styled,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import {
  PrimaryDiscipline,
  AgriculturalScienceSubDisciplines,
  AnthropologySubDisciplines,
  BiologySubDisciplines,
  ChemistrySubDisciplines,
  ComputerScienceSubDisciplines,
  DesignSubDisciplines,
  EconomicsSubDisciplines,
  EducationSubDisciplines,
  EngineeringSubDisciplines,
  EntertainmentandArtsSubDisciplines,
  GeoscienceSubDisciplines,
  HistorySubDisciplines,
  LawSubDisciplines,
  LinguisticsSubDisciplines,
  LiteratureSubDisciplines,
  MathematicsSubDisciplines,
  MedicineSubDisciplines,
  PhilosophySubDisciplines,
  PhysicsSubDisciplines,
  PoliticalScienceSubDisciplines,
  PsychologySubDisciplines,
  ReligiousStudiesSubDisciplines,
  SocialScienceSubDisciplines,
  SpaceScienceSubDisciplines,
} from "../../../../shared-types/disciplines";
import { Discipline } from "../../../../shared-types/requestData";

interface DisciplineSelectorProps {
  disciplines: Discipline[];
  handleChangeDisciplines: (value: Discipline[]) => void;
}

const CustomPaper = styled(Paper)<PaperProps>(() => ({
  minHeight: "600px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
}));

const DisciplineSelector: React.FC<DisciplineSelectorProps> = ({
  disciplines,
  handleChangeDisciplines,
}) => {
  const [open, setOpen] = useState(false);
  const [inputAutoComplete, setInputAutoComplete] = useState<string>("");
  const [selectedDisciplines, setSelectedDisciplines] =
    useState<Discipline[]>(disciplines);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    handleChangeDisciplines(selectedDisciplines);
    handleClose();
  };

  return (
    <>
      <Chip
        label="+ choose disciplines"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#fff",
          border: "1px solid black",
          borderRadius: "8px",
          marginRight: "10px",
          marginTop: "10px",
          "&:hover": {
            backgroundColor: "#C8E6C9",
          },
          textDecoration: "underline",
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={CustomPaper}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Discipline selection</DialogTitle>
        <DialogContent>
          <Autocomplete
            value={selectedDisciplines}
            onChange={(_, newValue) => {
              const uniqueValues = newValue.filter(
                (newItem, index, self) =>
                  index ===
                  self.findIndex(
                    (item) =>
                      item.primary === newItem.primary &&
                      item.secondary === newItem.secondary
                  )
              );
              setSelectedDisciplines(uniqueValues);
            }}
            inputValue={inputAutoComplete}
            multiple
            disablePortal
            onInputChange={(_, newInputValue) => {
              setInputAutoComplete(newInputValue);
            }}
            options={Object.values(PrimaryDiscipline).flatMap((primary) => {
              const secondaryDisciplineEnum = {
                [PrimaryDiscipline.AgriculturalScience]:
                  AgriculturalScienceSubDisciplines,
                [PrimaryDiscipline.Anthropology]: AnthropologySubDisciplines,
                [PrimaryDiscipline.Biology]: BiologySubDisciplines,
                [PrimaryDiscipline.Chemistry]: ChemistrySubDisciplines,
                [PrimaryDiscipline.ComputerScience]:
                  ComputerScienceSubDisciplines,
                [PrimaryDiscipline.Design]: DesignSubDisciplines,
                [PrimaryDiscipline.Economics]: EconomicsSubDisciplines,
                [PrimaryDiscipline.Education]: EducationSubDisciplines,
                [PrimaryDiscipline.Engineering]: EngineeringSubDisciplines,
                [PrimaryDiscipline.EntertainmentandArts]:
                  EntertainmentandArtsSubDisciplines,
                [PrimaryDiscipline.Geoscience]: GeoscienceSubDisciplines,
                [PrimaryDiscipline.History]: HistorySubDisciplines,
                [PrimaryDiscipline.Law]: LawSubDisciplines,
                [PrimaryDiscipline.Linguistics]: LinguisticsSubDisciplines,
                [PrimaryDiscipline.Literature]: LiteratureSubDisciplines,
                [PrimaryDiscipline.Mathematics]: MathematicsSubDisciplines,
                [PrimaryDiscipline.Medicine]: MedicineSubDisciplines,
                [PrimaryDiscipline.Philosophy]: PhilosophySubDisciplines,
                [PrimaryDiscipline.Physics]: PhysicsSubDisciplines,
                [PrimaryDiscipline.PoliticalScience]:
                  PoliticalScienceSubDisciplines,
                [PrimaryDiscipline.Psychology]: PsychologySubDisciplines,
                [PrimaryDiscipline.ReligiousStudies]:
                  ReligiousStudiesSubDisciplines,
                [PrimaryDiscipline.SocialScience]: SocialScienceSubDisciplines,
                [PrimaryDiscipline.SpaceScience]: SpaceScienceSubDisciplines,
              }[primary];

              return Object.values(secondaryDisciplineEnum).map(
                (secondary) => ({
                  primary,
                  secondary,
                })
              );
            })}
            getOptionLabel={(option) =>
              `${option.primary} - ${option.secondary}`
            }
            renderOption={(props, option) => (
              <li {...props} key={`${option.primary}-${option.secondary}`}>
                <Box display="flex" flexDirection="column" my={1}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {option.secondary}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {option.primary}
                  </Typography>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type a discipline to add"
                variant="outlined"
                sx={{
                  ".MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleClose}
              sx={{
                textTransform: "none",
                color: "#008080",
                fontWeight: 700,
                textDecoration: "underline",
                marginRight: "25px",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              Close
            </Button>
            <Button
              disabled={selectedDisciplines.length === 0}
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                width: "120px",
                borderRadius: "8px",
                textTransform: "none",
                height: "50px",
                fontWeight: 700,
                backgroundColor: "#008080",
                "&:hover": {
                  backgroundColor: "#006666",
                },
                marginY: "20px",
              }}
            >
              Add disciplines
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DisciplineSelector;
