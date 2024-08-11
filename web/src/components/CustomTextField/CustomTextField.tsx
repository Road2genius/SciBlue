import { TextField, Typography } from "@mui/material";
import React from "react";

interface TextFieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  multiline?: boolean;
}

const CustomTextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  required = false,
  multiline = false,
}) => (
  <>
    <Typography variant="subtitle2" fontWeight={600}>
      {label} {required && "*"}
    </Typography>
    <TextField
      size="small"
      placeholder={placeholder}
      type={type}
      variant="outlined"
      value={value}
      onChange={onChange}
      multiline={multiline}
      rows={multiline ? 4 : undefined}
      fullWidth
      sx={{
        marginBottom: "20px",
        maxWidth: "100%",
        minWidth: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1200px",
        },
      }}
    />
  </>
);

export default CustomTextField;
