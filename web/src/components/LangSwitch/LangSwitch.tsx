import React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Switch, SwitchProps } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FlagComponent from "../FlagComponent/FlagComponent";

interface CustomizedLangSwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const LangSwitch = styled((props: SwitchProps) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
    icon={
      <span
        style={{
          position: "relative",
          display: "inline-block",
          width: 32,
          height: 32,
        }}
      >
        <FlagComponent isRound countryCode="FR" />
      </span>
    }
    checkedIcon={
      <span
        style={{
          position: "relative",
          display: "inline-block",
          width: 32,
          height: 32,
        }}
      >
        <FlagComponent isRound countryCode="GB" />
      </span>
    }
  />
))(({ theme }: { theme: Theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...(theme.applyStyles &&
          theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
          })),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "transparent",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...(theme.applyStyles &&
      theme.applyStyles("dark", {
        backgroundColor: "#8796A5",
      })),
  },
}));

const CustomizedLangSwitch: React.FC<CustomizedLangSwitchProps> = ({ onChange, checked }) => {
  return (
    <FormControlLabel
      control={<LangSwitch sx={{ m: 1 }} checked={checked} onChange={(event) => onChange(event.target.checked)} />}
      label=""
    />
  );
};

export default CustomizedLangSwitch;
