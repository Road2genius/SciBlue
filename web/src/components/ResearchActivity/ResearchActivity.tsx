import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import { UserReq } from "../../../../shared-types/userData";
import { Discipline, NestedKeyOf } from "../../../../shared-types/requestData";
import DisciplineSelector from "../DisciplineSelection/DisciplineSelection";
import CustomTagInput from "../CustomTag/CustomTag";
import FieldsEnvironmentalAreaSelector from "../FieldsEnvironmentalAreaSelection/FieldsEnvironmentalAreaSelection";

interface ResearchActivityProps {
  user: UserReq;
  handleNestedChange: <K extends NestedKeyOf<UserReq>, NK extends keyof UserReq[K]>(
    section: K,
    field: NK,
    value: UserReq[K][NK]
  ) => void;
  handleDoubleNestedChip: <
    K extends keyof UserReq,
    NK extends keyof UserReq[K],
    NK2 extends keyof UserReq[K][NK],
  >(
    section: K,
    nestedSection: NK,
    field: NK2,
    item: UserReq[K][NK][NK2] extends Array<infer U> ? U : never
  ) => void;
  handleDoubleNestedChange: <
    K extends keyof UserReq,
    NK extends keyof UserReq[K],
    NK2 extends keyof UserReq[K][NK],
  >(
    section: K,
    nestedSection: NK,
    field: NK2,
    value: UserReq[K][NK][NK2]
  ) => void;
  professionalDoesResearch?: boolean;
  handleDeleteChipDiscipline: (discipline: Discipline) => void;
}

const ResearchActivity: React.FC<ResearchActivityProps> = ({
  user,
  handleNestedChange,
  handleDeleteChipDiscipline,
  handleDoubleNestedChip,
  handleDoubleNestedChange,
  professionalDoesResearch,
}) => {
  if (!user.organizationAffiliated) {
    return;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        Research activty and expertise
      </Typography>
      {!professionalDoesResearch && (
        <Typography variant="body2" color="GrayText" mb={2}>
          Help others understand your work and why your skills can be relevant
          to the environmental crisis
        </Typography>
      )}
      <Box mt={professionalDoesResearch ? 3 : 0}>
        <CustomTextField
          label={
            professionalDoesResearch
              ? "Introduce your research activity"
              : "Introduce yourself and your research"
          }
          placeholder=""
          type="text"
          value={user.researchActivityAndExpertise.description}
          multiline
          onChange={(e) =>
            handleNestedChange(
              "researchActivityAndExpertise",
              "description",
              e.target.value
            )
          }
          required={true}
        />
      </Box>
      <Typography variant="subtitle2" fontWeight={600}>
        Disciplines
      </Typography>
      <Box display="flex" mt={-1}>
        <Box>
          {user.researchActivityAndExpertise.disciplines.map(
            (discipline, index) => (
              <Chip
                key={index}
                label={`${discipline.primary} - ${discipline.secondary}`}
                onDelete={() => handleDeleteChipDiscipline(discipline)}
                sx={{
                  backgroundColor: "#C8E6C9",
                  border: "1px solid black",
                  borderRadius: "8px",
                  marginRight: "10px",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#C8E6C9",
                  },
                }}
              />
            )
          )}
          <DisciplineSelector
            disciplines={user.researchActivityAndExpertise.disciplines}
            handleChangeDisciplines={(newDisciplines) =>
              handleNestedChange(
                "researchActivityAndExpertise",
                "disciplines",
                newDisciplines
              )
            }
          />
        </Box>
      </Box>
      <Typography variant="subtitle2" fontWeight={600} mt={2} mb={-1}>
        Skills & Expertise
      </Typography>
      <CustomTagInput
        label="add a skill or expertise"
        customTags={user.researchActivityAndExpertise.expertisesAndSkills}
        setCustomTags={(newCustomTags) =>
          handleNestedChange(
            "researchActivityAndExpertise",
            "expertisesAndSkills",
            newCustomTags
          )
        }
      />
      {!professionalDoesResearch && (
        <>
          <Typography variant="subtitle2" fontWeight={600} mt={3}>
            Do you already apply your expertise to area(s) related to the
            environmental crisis?
          </Typography>
          <FieldsEnvironmentalAreaSelector
            user={user}
            activity="researchActivityAndExpertise"
            handleDoubleNestedChip={handleDoubleNestedChip}
            handleDoubleNestedChange={handleDoubleNestedChange}
          />

          <Typography variant="subtitle2" fontWeight={600} mt={3}>
            Do you want to add other application area(s), non-related to
            environmental crisis, where you are used to apply your expertise ?
          </Typography>
          <CustomTagInput
            label="add another application area"
            customTags={user.researchActivityAndExpertise.fieldsApplicationArea}
            setCustomTags={(newCustomTags) =>
              handleNestedChange(
                "researchActivityAndExpertise",
                "fieldsApplicationArea",
                newCustomTags
              )
            }
          />
          <Box mt={8} mb={5} ml={8}>
            <Divider
              variant="fullWidth"
              sx={{
                borderBottomWidth: 1.5,
                minWidth: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                  xl: "1250px",
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResearchActivity;
