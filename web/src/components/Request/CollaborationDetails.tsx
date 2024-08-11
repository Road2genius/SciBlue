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

  return (
    <>
      <Typography variant="h5" fontWeight={600} my={2}>
        Describe the collaboration you are looking for
      </Typography>
      <Typography variant="body2" fontWeight={600} mt={2}>
        Collaboration type *
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        {Object.values(TypeOfCollaboration).map((label) => (
          <Chip
            key={label}
            label={label}
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
                backgroundColor: "#C8E6C9",
              },
            }}
            clickable
          />
        ))}
      </Box>
      <CustomTextField
        label="Title of your collaboration request"
        placeholder="The title of your request will be the most visible information. Try to be concise and precise."
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
        label="Describe in details what you are looking for"
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
