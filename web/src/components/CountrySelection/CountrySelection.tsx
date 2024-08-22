import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
  Chip,
  PaperProps,
  styled,
  Paper,
  Box,
} from "@mui/material";
import { CountryNames } from "../../../../shared-types/user";

interface CountrySelectorProps {
  country: CountryNames;
  handleChangeCountry: (country: CountryNames) => void;
}

const CustomPaper = styled(Paper)<PaperProps>(() => ({
  minHeight: "600px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
}));

const CountrySelector: React.FC<CountrySelectorProps> = ({
  country,
  handleChangeCountry,
}) => {
  const [open, setOpen] = useState(false);
  const [inputAutoComplete, setInputAutoComplete] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryNames>(country);

  const handleOpen = () => {
    setSelectedCountry(country);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    handleChangeCountry(selectedCountry);
    handleClose();
  };

  return (
    <>
      <Chip
        label="+ choose a country"
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

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={CustomPaper}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Country selection</DialogTitle>
        <DialogContent>
          <Autocomplete
            value={selectedCountry}
            onChange={(_, newValue) => {
              if (newValue) {
                setSelectedCountry(newValue as CountryNames);
              }
            }}
            inputValue={inputAutoComplete}
            disablePortal
            onInputChange={(_, newInputValue) => {
              setInputAutoComplete(newInputValue);
            }}
            options={Object.values(CountryNames)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type a country to select"
                variant="outlined"
                sx={{
                  ".MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleClose}
              sx={{
                textTransform: "none",
                color: "#008080",
                fontWeight: 700,
                textDecoration: "underline",
                marginRight: "25px",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              Close
            </Button>
            <Button
              disabled={!selectedCountry}
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                width: "120px",
                borderRadius: "8px",
                textTransform: "none",
                height: "50px",
                fontWeight: 700,
                backgroundColor: "#008080",
                "&:hover": {
                  backgroundColor: "#006666",
                },
                marginY: "20px",
              }}
            >
              Select Country
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CountrySelector;
