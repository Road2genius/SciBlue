import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

interface FlagComponentProps {
  countryCode?: string;
  isRound?: boolean;
  langI18n?: boolean;
}

const FlagComponent: React.FC<FlagComponentProps> = ({ countryCode, isRound = false, langI18n = false }) => {
  const flagSizeCases = (): string => {
    if (isRound) return "30px";
    else if (langI18n) return "15px";
    else return "60px";
  };

  const Flag = Flags[countryCode as keyof typeof Flags];
  return Flag ? (
    <div
      style={{
        width: flagSizeCases(),
        height: flagSizeCases(),
        borderRadius: isRound || langI18n ? "50%" : "0%",
        border: "1px solid black",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Flag
        title={countryCode}
        style={{
          transform: isRound || langI18n ? "scale(1.4)" : "none",
        }}
      />
    </div>
  ) : null;
};

export default FlagComponent;
