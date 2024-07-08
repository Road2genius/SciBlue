import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const KeywordInput: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleAddKeyword = (): void => {
    if (keyword.trim() !== "") {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword("");
    }
  };

  const handleDeleteKeyword = (keywordToDelete: string) => (): void =>
    setKeywords(keywords.filter((keyword) => keyword !== keywordToDelete));

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleAddKeyword();
    }
  };

  return (
    <>
      <Typography variant="h6">
        Add relevant keywords to your activity
      </Typography>

      <Box display="flex" alignItems="center" mt={2} mb={2}>
        <TextField
          placeholder="Enter keyword"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          variant="outlined"
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
            marginLeft: "10px",
            color: "#fff",
          }}
        >
          Add
        </Button>
      </Box>

      <Box mb={3}>
        {keywords.map((keyword, index) => (
          <Chip
            key={index}
            label={keyword}
            onDelete={handleDeleteKeyword(keyword)}
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
    </>
  );
};

export default KeywordInput;
