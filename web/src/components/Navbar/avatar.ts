import MultiAvatar from "../../assets/avatars/multi-target.svg";
import AcademicAvatar from "../../assets/avatars/academic.svg";
import CroPrivateAvatar from "../../assets/avatars/cro-private.svg";
import FreelanceAvatar from "../../assets/avatars/freelance.svg";
import NgoNonProfitAvatar from "../../assets/avatars/ngo-non-profit.svg";
import CorporationAvatar from "../../assets/avatars/corporation.svg";
import GovernmentAvatar from "../../assets/avatars/government.svg";

export const getAvatarKey = (url: string): string => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.replace('.svg', '');
  };
  

export const avatars: { [key: string]: string } = {
  "multi-target": MultiAvatar,
  academic: AcademicAvatar,
  "cro-private": CroPrivateAvatar,
  freelance: FreelanceAvatar,
  "ngo-non-profit": NgoNonProfitAvatar,
  corporation: CorporationAvatar,
  government: GovernmentAvatar,
};
