import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import { UserReq } from "../../../../shared-types/userData";
import { Discipline, NestedKeyOf } from "../../../../shared-types/requestData";
import DisciplineSelector from "../DisciplineSelection/DisciplineSelection";
import CustomTagInput from "../CustomTag/CustomTag";
import FieldsEnvironmentalAreaSelector from "../FieldsEnvironmentalAreaSelection/FieldsEnvironmentalAreaSelection";
import { Trans, useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  if (!user.organizationAffiliated) {
    return;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        <Trans i18nKey="research_activity_and_expertise_title"/>
      </Typography>
      {!professionalDoesResearch && (
        <Typography variant="body2" color="GrayText" mb={2}>
          <Trans i18nKey="research_activity_and_expertise_title_placeholder"/>
        </Typography>
      )}
      <Box mt={professionalDoesResearch ? 3 : 0}>
        <CustomTextField
          label={
            professionalDoesResearch
              ? t("research_activity_and_expertise_introduction_pro_research")
              : t("research_activity_and_expertise_introduction")
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
        <Trans i18nKey="research_activity_and_expertise_disciplines"/>
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
        <Trans i18nKey="research_activity_and_expertise_skills_and_expertise_title"/>
      </Typography>
      <CustomTagInput
        label={t('research_activity_and_expertise_skills_and_expertise_placeholder')}
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
            <Trans i18nKey="research_activity_and_expertise_environmental_area_title"/>
          </Typography>
          <FieldsEnvironmentalAreaSelector
            user={user}
            activity="researchActivityAndExpertise"
            handleDoubleNestedChip={handleDoubleNestedChip}
            handleDoubleNestedChange={handleDoubleNestedChange}
          />

          <Typography variant="subtitle2" fontWeight={600} mt={3}>
            <Trans i18nKey="research_activity_and_expertise_another_application_area_title"/>
          </Typography>
          <CustomTagInput
            label={t('research_activity_and_expertise_another_application_area_button')}
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
