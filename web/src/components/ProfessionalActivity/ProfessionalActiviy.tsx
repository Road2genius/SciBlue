import React from "react";
import { Box, Typography, Divider, Switch } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import { UserReq } from "../../../../shared-types/userData";
import { Discipline, NestedKeyOf } from "../../../../shared-types/requestData";
import CustomTagInput from "../CustomTag/CustomTag";
import FieldsEnvironmentalAreaSelector from "../FieldsEnvironmentalAreaSelection/FieldsEnvironmentalAreaSelection";
import ResearchActivity from "../ResearchActivity/ResearchActivity";
import { Trans, useTranslation } from "react-i18next";

interface ProfessionalActivityProps {
  user: UserReq;
  handleChange: <K extends keyof UserReq>(field: K, value: UserReq[K]) => void;
  handleNestedChange: <
    K extends NestedKeyOf<UserReq>,
    NK extends keyof UserReq[K],
  >(
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
  handleDeleteChipDiscipline: (discipline: Discipline) => void;
}

const ProfessionalActivity: React.FC<ProfessionalActivityProps> = ({
  user,
  handleNestedChange,
  handleDoubleNestedChip,
  handleDoubleNestedChange,
  handleDeleteChipDiscipline,
  handleChange,
}) => {
  const { t } = useTranslation();

  if (!user.organizationAffiliated) {
    return;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        <Trans i18nKey="professional_activity_and_expertise_title"/>
      </Typography>
      <Typography variant="body2" color="GrayText" mb={2}>
        <Trans i18nKey="professional_activity_and_expertise_subtitle"/>
      </Typography>
      <Typography variant="subtitle2" fontWeight={600} mt={3}>
        <Trans i18nKey="professional_activity_and_expertise_environmental_area_title"/>
      </Typography>
      <FieldsEnvironmentalAreaSelector
        user={user}
        activity="professionalActivityAndExpertise"
        handleDoubleNestedChip={handleDoubleNestedChip}
        handleDoubleNestedChange={handleDoubleNestedChange}
      />
      <Box mt={4}>
        <CustomTextField
          label={t("professional_activity_and_expertise_description_label")}
          placeholder=""
          type="text"
          value={user.professionalActivityAndExpertise.description}
          multiline
          onChange={(e) =>
            handleNestedChange(
              "professionalActivityAndExpertise",
              "description",
              e.target.value
            )
          }
          required={true}
        />
      </Box>
      <Typography variant="subtitle2" fontWeight={600} mt={1} mb={-1}>
        <Trans i18nKey="research_activity_and_expertise_skills_and_expertise_title"/>
      </Typography>
      <CustomTagInput
        label={t('research_activity_and_expertise_skills_and_expertise_placeholder')}
        customTags={user.professionalActivityAndExpertise.expertisesAndSkills}
        setCustomTags={(newCustomTags) =>
          handleNestedChange(
            "professionalActivityAndExpertise",
            "expertisesAndSkills",
            newCustomTags
          )
        }
      />
      <Box display="flex" alignItems="center" mt={3}>
        <Typography variant="subtitle2" fontWeight={600} mr={2}>
          <Trans i18nKey="professional_activity_and_expertise_can_fund_research"/>
        </Typography>
        <Typography variant="subtitle2" ml={2}>
          <Trans i18nKey="professional_activity_and_expertise_can_fund_research_yes"/>
        </Typography>
        <Switch
          checked={user.funder}
          onChange={(e) => handleChange("funder", e.target.checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#008080",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#008080",
            },
          }}
        />
        <Typography variant="subtitle2" ml={2}>
          <Trans i18nKey="professional_activity_and_expertise_can_fund_research_no"/>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle2" fontWeight={600} mr={2}>
          <Trans i18nKey="professional_activity_and_expertise_can_engage_research"/>
        </Typography>
        <Typography variant="subtitle2" ml={2}>
          <Trans i18nKey="professional_activity_and_expertise_can_engage_research_yes"/>
        </Typography>
        <Switch
          checked={user.proDoesResearch}
          onChange={(e) => handleChange("proDoesResearch", e.target.checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#008080",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#008080",
            },
          }}
        />
        <Typography variant="subtitle2" ml={2}>
          <Trans i18nKey="professional_activity_and_expertise_can_engage_research_no"/>
        </Typography>
      </Box>

      {user.proDoesResearch && (
        <>
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
          <ResearchActivity
            user={user}
            professionalDoesResearch
            handleNestedChange={handleNestedChange}
            handleDeleteChipDiscipline={handleDeleteChipDiscipline}
            handleDoubleNestedChip={handleDoubleNestedChip}
            handleDoubleNestedChange={handleDoubleNestedChange}
          />
        </>
      )}

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
    </Box>
  );
};

export default ProfessionalActivity;
