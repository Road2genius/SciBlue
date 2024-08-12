import AcademicAvatar from "../../assets/avatars/academic.svg";
import FreelanceAvatar from "../../assets/avatars/freelancer.svg";
import GovernmentAvatar from "../../assets/avatars/government.svg";
import OngAvatar from "../../assets/avatars/ong.svg";
import PrivateAvatar from "../../assets/avatars/privateResearch.svg";

export const getAvatarKey = (url?: string): string => {
  if (url) {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename.replace(".svg", "");
  }
  return "";
};

export const avatars: { [key: string]: string } = {
  academic: AcademicAvatar,
  freelancer: FreelanceAvatar,
  government: GovernmentAvatar,
  ong: OngAvatar,
  privateResearch: PrivateAvatar,
};
