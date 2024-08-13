import React from "react";
import { Box, Chip, Typography, Autocomplete, TextField, Popper, PopperProps } from "@mui/material";
import CustomTagInput from "../../components/CustomTag/CustomTag";
import { TypeOfOrganization } from "../../../../shared-types/user";
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
import { makeStyles } from "@mui/styles";
import {
  NestedKeyOf,
  RequestReqInterface,
  RequestResInterface,
} from "../../../../shared-types/requestData";

const CustomPopper = (props: PopperProps) => {
    return <Popper {...props} placement="bottom" />;
  };

interface SpecificsDetailsProps {
  request: RequestReqInterface | RequestResInterface;
  inputAutoComplete: string;
  setInputAutoComplete: (value: string) => void;
  handleNestedChange: <
    K extends NestedKeyOf<RequestReqInterface>,
    NK extends keyof RequestReqInterface[K],
  >(
    section: K,
    field: NK,
    value: RequestReqInterface[K][NK]
  ) => void;
  handleNestedChip: <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
  >(
    section: K,
    field: NK,
    value: RequestReqInterface[K][NK] extends Array<infer U>
      ? U
      : RequestReqInterface[K][NK]
  ) => void;
}

const SpecificsDetails: React.FC<SpecificsDetailsProps> = ({
  request,
  inputAutoComplete,
  setInputAutoComplete,
  handleNestedChange,
  handleNestedChip,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" fontWeight={600} my={2}>
        Are they any specifics you are looking for? (optional)
      </Typography>
      <Typography variant="body2" fontWeight={600} mt={2}>
        Organization(s) requested
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        {Object.values(TypeOfOrganization).map((label) => (
          <Chip
            key={label}
            label={label}
            onClick={() =>
              handleNestedChip(
                "specificsSkills",
                "organizationRequested",
                label
              )
            }
            sx={{
              marginRight: "10px",
              marginTop: "10px",
              backgroundColor:
                request.specificsSkills.organizationRequested.includes(
                  label as TypeOfOrganization
                )
                  ? "#C8E6C9"
                  : "transparent",
              color: request.specificsSkills.organizationRequested.includes(
                label as TypeOfOrganization
              )
                ? "#000"
                : "",
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
      <Typography variant="body2" fontWeight={600} my={2}>
        Disciplines
      </Typography>
      <Autocomplete
        value={request.specificsSkills.disciplines || []}
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
          handleNestedChange("specificsSkills", "disciplines", uniqueValues);
        }}
        inputValue={inputAutoComplete}
        multiple
        disablePortal
        PopperComponent={CustomPopper}
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
            [PrimaryDiscipline.ComputerScience]: ComputerScienceSubDisciplines,
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

          return Object.values(secondaryDisciplineEnum).map((secondary) => ({
            primary,
            secondary,
          }));
        })}
        getOptionLabel={(option) => `${option.primary} - ${option.secondary}`}
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
            label="Choose a discipline"
            variant="outlined"
          />
        )}
      />
      <Typography variant="body2" fontWeight={600} mt={2}>
        Expertises & Skills
      </Typography>
      <CustomTagInput
        label="add your tag"
        customTags={request.specificsSkills.expertisesAndSkills ?? []}
        setCustomTags={(newCustomTags) =>
          handleNestedChange(
            "specificsSkills",
            "expertisesAndSkills",
            newCustomTags
          )
        }
      />
    </>
  );
};

const useStyles = makeStyles({
  chipContainer: {
    maxWidth: "800px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5px",
    alignItems: "center",
  },
});

export default SpecificsDetails;
