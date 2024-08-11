import { formatDistanceToNow, differenceInYears } from "date-fns";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getModifiedTimeAgo = (date: Date | string): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const yearsDifference = differenceInYears(new Date(), parsedDate);

  if (yearsDifference >= 1) {
    return "Modified more than a year ago";
  }

  return formatDistanceToNow(parsedDate);
};

export const truncateText = (
  text: string,
  maxLines: number,
  lineHeight: number,
  containerWidth: number
): string => {
  const charsPerLine = Math.floor(containerWidth / (lineHeight * 0.5));
  const maxChars = charsPerLine * maxLines;

  if (text.length <= maxChars) {
    return text;
  } else {
    return text.slice(0, maxChars) + "...";
  }
};


export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};