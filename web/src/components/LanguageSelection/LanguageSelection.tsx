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
import { Languages } from "../../../../shared-types/user";
import { Trans, useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  languages: Languages[];
  handleChangeLanguages: (languages: Languages[]) => void;
}

const CustomPaper = styled(Paper)<PaperProps>(() => ({
  minHeight: "600px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
}));

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  handleChangeLanguages,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [inputAutoComplete, setInputAutoComplete] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] =
    useState<Languages[]>(languages);

  const handleOpen = () => {
    setSelectedLanguages(languages);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    handleChangeLanguages(selectedLanguages);
    handleClose();
  };

  return (
    <>
      <Chip
        label={`+ ` + t('general_information_language_placeholder')}
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
        <DialogTitle><Trans i18nKey="general_information_dialog_language_title"/></DialogTitle>
        <DialogContent>
          <Autocomplete
            value={selectedLanguages}
            onChange={(_, newValue) => {
              const uniqueValues = Array.from(new Set(newValue));
              setSelectedLanguages(uniqueValues);
            }}
            inputValue={inputAutoComplete}
            multiple
            disablePortal
            onInputChange={(_, newInputValue) => {
              setInputAutoComplete(newInputValue);
            }}
            options={Object.values(Languages)}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t('general_information_dialog_language_placeholder')}
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
              <Trans i18nKey="general_information_dialog_close"/>
            </Button>
            <Button
              disabled={selectedLanguages.length === 0}
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
              <Trans i18nKey="general_information_dialog_language_submit"/>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LanguageSelector;
