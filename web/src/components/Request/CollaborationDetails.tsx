import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { TypeOfCollaboration } from "../../../../shared-types/user";
import { makeStyles } from "@mui/styles";
import {
  NestedKeyOf,
  RequestReqInterface,
  RequestResInterface,
} from "../../../../shared-types/requestData";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

interface CollaborationDetailsProps {
  request: RequestReqInterface | RequestResInterface;
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

const CollaborationDetails: React.FC<CollaborationDetailsProps> = ({
  request,
  handleNestedChange,
  handleNestedChip,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { translatedCollaborationsType } = useTranslatedEnum();

  return (
    <>
      <Typography variant="h5" fontWeight={600} my={2}>
        <Trans i18nKey="create_request_collab_detail_title" />
      </Typography>
      <Typography variant="body2" fontWeight={600} mt={2}>
        <Trans i18nKey="create_request_collab_detail_type" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        {Object.values(TypeOfCollaboration).map((label) => (
          <Chip
            key={label}
            label={translatedCollaborationsType[label]}
            onClick={() =>
              handleNestedChip(
                "kindOfCollaborationWanted",
                "typeOfCollaboration",
                label
              )
            }
            sx={{
              marginRight: "10px",
              marginTop: "10px",
              backgroundColor:
                request.kindOfCollaborationWanted.typeOfCollaboration.includes(
                  label as TypeOfCollaboration
                )
                  ? "#C8E6C9"
                  : "transparent",
              color:
                request.kindOfCollaborationWanted.typeOfCollaboration.includes(
                  label as TypeOfCollaboration
                )
                  ? "#000"
                  : "",
              border: "1px solid black",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor:
                  request.kindOfCollaborationWanted.typeOfCollaboration.includes(
                    label as TypeOfCollaboration
                  )
                    ? "#C8E6C9"
                    : "transparent",
              },
            }}
            clickable
          />
        ))}
      </Box>
      <CustomTextField
        label={t("create_request_collab_detail_title_request_label")}
        placeholder={t(
          "create_request_collab_detail_title_request_placeholder"
        )}
        type="text"
        value={request.kindOfCollaborationWanted.requestTitle}
        onChange={(e) =>
          handleNestedChange(
            "kindOfCollaborationWanted",
            "requestTitle",
            e.target.value
          )
        }
        required
      />
      <CustomTextField
        label={t("create_request_collab_detail_description_request_label")}
        placeholder=""
        type="text"
        value={request.kindOfCollaborationWanted.description}
        onChange={(e) =>
          handleNestedChange(
            "kindOfCollaborationWanted",
            "description",
            e.target.value
          )
        }
        required
        multiline
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

export default CollaborationDetails;
