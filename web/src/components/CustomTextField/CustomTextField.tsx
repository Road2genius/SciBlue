import { TextField, Typography } from "@mui/material";
import React from "react";

interface TextFieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CustomTextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  required = false,
}) => (
  <>
    <Typography variant="body1" fontWeight={600}>
      {label} {required && "*"}
    </Typography>
    <TextField
      size="small"
      fullWidth
      placeholder={placeholder}
      type={type}
      variant="outlined"
      value={value}
      onChange={onChange}
      sx={{ marginBottom: "20px" }}
    />
  </>
);

export default CustomTextField;
