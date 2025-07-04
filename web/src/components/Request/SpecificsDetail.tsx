import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import CustomTagInput from "../../components/CustomTag/CustomTag";
import { TypeOfOrganization } from "../../../../shared-types/user";
import { makeStyles } from "@mui/styles";
import {
  Discipline,
  NestedKeyOf,
  RequestReqInterface,
  RequestResInterface,
} from "../../../../shared-types/requestData";
import DisciplineSelector from "../DisciplineSelection/DisciplineSelection";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

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
  handleDeleteChipDiscipline: (discipline: Discipline) => void;
}

const SpecificsDetails: React.FC<SpecificsDetailsProps> = ({
  request,
  handleNestedChange,
  handleNestedChip,
  handleDeleteChipDiscipline,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { translatedOrganizations } = useTranslatedEnum();

  return (
    <>
      <Typography variant="h5" fontWeight={600} my={2}>
        <Trans i18nKey="create_request_specifics_detail_title" />
      </Typography>
      <Typography variant="body2" fontWeight={600} mt={2}>
        <Trans i18nKey="create_request_specifics_detail_organization_requested_title" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        {Object.values(TypeOfOrganization).map((label) => (
          <Chip
            key={label}
            label={translatedOrganizations[label]}
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
                backgroundColor:
                  request.specificsSkills.organizationRequested.includes(
                    label as TypeOfOrganization
                  )
                    ? "#C8E6C9"
                    : "transparent",
              },
            }}
            clickable
          />
        ))}
      </Box>
      <Typography variant="body2" fontWeight={600}>
        <Trans i18nKey="create_request_specifics_detail_disciplines_title" />
      </Typography>
      <Box>
        {request.specificsSkills.disciplines.map((discipline, index) => (
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
        ))}
        <DisciplineSelector
          disciplines={request.specificsSkills.disciplines}
          handleChangeDisciplines={(newDisciplines) =>
            handleNestedChange("specificsSkills", "disciplines", newDisciplines)
          }
        />
      </Box>
      <Typography variant="body2" fontWeight={600} mt={2}>
        <Trans i18nKey="create_request_specifics_detail_expertises_and_skills_title" />
      </Typography>
      <CustomTagInput
        label={t("create_request_specifics_detail_expertises_and_skills_label")}
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
