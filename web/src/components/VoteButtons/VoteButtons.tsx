import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { CollaborationVote } from "../../../../shared-types/user";

interface VoteButtonsProps {
  entityId: string; // Peut être l'ID de la demande ou de la question
  positiveVotes: number;
  negativeVotes: number;
  userHasVotedPositive: boolean;
  userHasVotedNegative: boolean;
  submitVote: (entityId: string, vote: CollaborationVote) => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  entityId,
  positiveVotes,
  negativeVotes,
  userHasVotedPositive,
  userHasVotedNegative,
  submitVote,
}) => {
  return (
    <Box display="flex" alignItems="center" flexGrow={1}>
      <Box display="flex" alignItems="center" mr={2}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            minWidth: 0,
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
            borderColor: "black",
            backgroundColor: userHasVotedPositive ? "#C8E6C9" : "transparent",
            "&:hover": {
              backgroundColor: "#197278",
              borderColor: "black",
            },
          }}
          onClick={() => submitVote(entityId, CollaborationVote.positive)}
        >
          <ThumbUpOffAltIcon sx={{ color: "black" }} />
        </Button>
        <Typography variant="h6" color="gray">
          {positiveVotes}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mr={2}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            minWidth: 0,
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
            borderColor: "black",
            backgroundColor: userHasVotedNegative ? "#C8E6C9" : "transparent",
            "&:hover": {
              backgroundColor: "#197278",
              borderColor: "black",
            },
          }}
          onClick={() => submitVote(entityId, CollaborationVote.negative)}
        >
          <ThumbDownOffAltIcon
            sx={{
              color: "black",
              transform: "scaleX(-1)",
            }}
          />
        </Button>
        <Typography variant="h6" color="gray">
          {negativeVotes}
        </Typography>
      </Box>
    </Box>
  );
};

export default VoteButtons;
