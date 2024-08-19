import { TypeOfOrganization } from "../../../../shared-types/user";

export const getAvatar = (avatarFilename: string): string => {
  const avatarUrl = `${import.meta.env.VITE_AVATAR_BASE_URL}/${avatarFilename}`;
  return avatarUrl;
};

export const avatarUrls: { [key in TypeOfOrganization]: string } = {
  [TypeOfOrganization.AcademicLaboratoryAndInstitute]:
    getAvatar("academic.svg"),
  [TypeOfOrganization.AcademicTechnologyPlatform]: getAvatar("academic.svg"),
  [TypeOfOrganization.FreelanceScientist]: getAvatar("freelancer.svg"),
  [TypeOfOrganization.Government]: getAvatar("government.svg"),
  [TypeOfOrganization.NgoNonProfitOrganizationFoundation]: getAvatar("ong.svg"),
  [TypeOfOrganization.PrivateResearchOrganizations]: getAvatar(
    "privateResearch.svg"
  ),
};

export const getAvatarByOrganization = (
  organization?: TypeOfOrganization
): string | undefined => {
  if (organization) {
    return avatarUrls[organization];
  }
};
