import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserReq } from "../../../../shared-types/userData";

interface LoginField {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  textfield: string;
  required?: boolean;
  multiline?: boolean;
}

interface LoginInformationProps {
  textFields: LoginField[];
  handleChange: (field: keyof UserReq, value: string) => void;
  user: UserReq;
  fromProfileInformation?: boolean;
}

const LoginInformation: React.FC<LoginInformationProps> = ({
  textFields,
  handleChange,
  user,
  fromProfileInformation,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!user.organizationAffiliated) {
    return;
  }

  const getGoodLabel = (field: LoginField) => {
    if (field.label === "Password") {
      if (fromProfileInformation) {
        field.value = "";
        return "New Password";
      } else return "Password";
    }
    return field.label;
  };

  return (
    <>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Login information
      </Typography>
      {textFields.slice(0, 2).map((field, index) => (
        <CustomTextField
          key={index + 4}
          label={getGoodLabel(field)}
          placeholder={field.placeholder}
          type={
            field.type === "password" && !showPassword ? "password" : "text"
          }
          value={field.value ?? ""}
          onChange={(e) =>
            handleChange(field.textfield as keyof typeof user, e.target.value)
          }
          required={field.required}
          multiline={field.multiline}
          short={true}
          InputProps={{
            endAdornment:
              field.type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      ))}
      <Box mt={8} mb={5} ml={8}>
        <Divider
          variant="fullWidth"
          sx={{
            borderBottomWidth: 1.5,
            minWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "1250px",
            },
          }}
        />
      </Box>
    </>
  );
};

export default LoginInformation;
