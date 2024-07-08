import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { TagInputProps } from "../../types/tagInput.type";

const TagInput: React.FC<TagInputProps> = ({
  label,
  placeholder,
  defaultTags,
}) => {
  const classes = useStyles();
  const defaultTagList: string[] = defaultTags;
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const handleAddPersonnalisedTag = (): void => {
    if (tag.trim() !== "" && !customTags.includes(tag.trim())) {
      setCustomTags([...customTags, tag.trim()]);
      setTag("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => (): void =>
    setCustomTags(customTags.filter((tag) => tag !== tagToDelete));

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleAddPersonnalisedTag();
    }
  };

  return (
    <Box>
      <Typography variant="h6">{label}</Typography>
      <Box className={classes.chipContainer}>
        {defaultTagList.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid black",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#C8E6C9",
              },
            }}
          />
        ))}
        {customTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={handleDeleteTag(tag)}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid black",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#C8E6C9",
              },
            }}
          />
        ))}
      </Box>

      <Box mt={1} mb={1}>
        <TextField
          label={placeholder}
          variant="outlined"
          size="small"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          variant="outlined"
          onClick={handleAddPersonnalisedTag}
          sx={{
            borderRadius: "5px",
            textTransform: "none",
            height: "40px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            color: "#fff",
            marginLeft: "10px",
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default TagInput;

const useStyles = makeStyles({
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },
});
