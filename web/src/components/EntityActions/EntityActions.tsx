import React from "react";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { useNavigate } from "react-router-dom";
import { CollaborationStatus, DiscussionStatus } from "../../../../shared-types/user";

interface EntityActionsProps {
  entityId: string;
  userId: string;
  currentUserId?: string;
  entityType: "request" | "question";
  status: CollaborationStatus | DiscussionStatus;
  handleUpdateStatus: () => void;
  setOpenDialogDelete: (open: boolean) => void;
}

const EntityActions: React.FC<EntityActionsProps> = ({
  entityId,
  userId,
  currentUserId,
  entityType,
  status,
  handleUpdateStatus,
  setOpenDialogDelete,
}) => {
  const navigate = useNavigate();

  if (userId !== currentUserId) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        title={`Edit ${entityType}`}
        size="small"
        variant="outlined"
        sx={{
          minWidth: 0,
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "10px",
          borderColor: "#197278",
          color: "#197278",
          "&:hover": {
            borderColor: "black",
          },
          alignSelf: "flex-end",
        }}
        onClick={() => navigate(`/${entityType}/edit/${entityId}`)}
      >
        <EditOutlinedIcon />
      </Button>
      <Button
        title={`Delete ${entityType}`}
        size="small"
        variant="outlined"
        sx={{
          minWidth: 0,
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "10px",
          borderColor: "#197278",
          color: "#197278",
          "&:hover": {
            borderColor: "black",
          },
          alignSelf: "flex-end",
        }}
        onClick={() => setOpenDialogDelete(true)}
      >
        <DeleteForeverOutlinedIcon />
      </Button>
      {(status === CollaborationStatus.open || status === DiscussionStatus.open) ? (
        <Button
          title={`Close ${entityType}`}
          size="small"
          variant="outlined"
          sx={{
            minWidth: 0,
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
            borderColor: "#197278",
            color: "#197278",
            "&:hover": {
              borderColor: "black",
            },
            alignSelf: "flex-end",
          }}
          onClick={handleUpdateStatus}
        >
          <ArchiveOutlinedIcon />
        </Button>
      ) : (
        <Button
          size="small"
          variant="outlined"
          title={`Open ${entityType}`}
          sx={{
            minWidth: 0,
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
            borderColor: "#197278",
            color: "#197278",
            "&:hover": {
              borderColor: "black",
            },
            alignSelf: "flex-end",
          }}
          onClick={handleUpdateStatus}
        >
          <UnarchiveOutlinedIcon />
        </Button>
      )}
    </Box>
  );
};

export default EntityActions;
