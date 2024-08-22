import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface CustomTagInputProps {
  title?: string;
  subtitle?: string;
  label?: string;
  customTags: string[];
  setCustomTags: (customTags: string[]) => void;
  environmental?: boolean;
}

const CustomTagInput: React.FC<CustomTagInputProps> = ({
  title,
  subtitle,
  label,
  customTags,
  setCustomTags,
  environmental,
}) => {
  const [customTag, setCustomTag] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleAddKeyword = (): void => {
    if (customTag.trim() !== "") {
      setCustomTags([...customTags, customTag.trim()]);
      setCustomTag("");
    }
    handleClose();
  };

  const handleDeleteKeyword = (customTagToDelete: string) => (): void =>
    setCustomTags(
      customTags.filter((customTag) => customTag !== customTagToDelete)
    );

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleAddKeyword();
    }
  };

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle2" fontWeight={600}>
        {subtitle}
      </Typography>
      <Box display="flex" alignItems="center">
        <Box maxWidth="800px">
          {!environmental && (
            <>
              {customTags?.map((customTag, index) => (
                <Chip
                  key={index}
                  label={customTag}
                  onDelete={handleDeleteKeyword(customTag)}
                  sx={{
                    backgroundColor: "#C8E6C9",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginRight: "10px",
                    marginTop: "10px",
                    "&:hover": {
                      backgroundColor: "#C8E6C9",
                    },
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    ".MuiChip-label": {
                      maxWidth: "90%",
                    },
                  }}
                />
              ))}
            </>
          )}
          <Box display="flex" alignItems="center">
            <Chip
              label={`+ ${label}`}
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
                ".MuiChip-label": {
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom input add"
        aria-describedby="custom-modal-add"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="background.paper"
          boxShadow={24}
          p={8}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            outline: 0,
          }}
        >
          <Typography variant="h6" mb={4} align="center">
            Enter your {label?.replace("add a", "")}
          </Typography>
          <TextField
            placeholder={label}
            variant="outlined"
            size="small"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddKeyword}
            sx={{
              borderRadius: "5px",
              textTransform: "none",
              height: "40px",
              fontWeight: 700,
              backgroundColor: "#008080",
              "&:hover": {
                backgroundColor: "#006666",
              },
              marginTop: "10px",
              color: "#fff",
              width: "100%",
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CustomTagInput;
