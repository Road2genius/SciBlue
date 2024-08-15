import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

interface FlagComponentProps {
  countryCode?: string;
  isRound?: boolean;
}

const FlagComponent: React.FC<FlagComponentProps> = ({
  countryCode,
  isRound = false,
}) => {
  const Flag = Flags[countryCode as keyof typeof Flags];
  return Flag ? (
    <div
      style={{
        width: isRound ? "30px" : "60px",
        height: isRound ? "30px" : "auto",
        borderRadius: isRound ? "50%" : "0%",
        border: "1px solid black",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Flag
        title={countryCode}
        style={{
          // width: isRound ? "100%" : "100%",
          // height: isRound ? "auto" : "auto",
          // objectFit: "cover",
          transform: isRound ? "scale(1.4)" : "none",
        }}
      />
    </div>
  ) : null;
};

export default FlagComponent;
