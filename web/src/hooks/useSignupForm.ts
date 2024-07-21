import { useEffect, useState } from "react";
import { User } from "../../../shared-types/userData";
import { OrganizationAffiliated } from "../../../shared-types/user";
import MultiAvatar from "../assets/avatars/multi-target.svg";
import AcademicAvatar from "../assets/avatars/academic.svg";
import CroPrivateAvatar from "../assets/avatars/cro-private.svg";
import FreelanceAvatar from "../assets/avatars/freelance.svg";
import NgoNonProfitAvatar from "../assets/avatars/ngo-non-profit.svg";
import CorporationAvatar from "../assets/avatars/corporation.svg";
import GovernmentAvatar from "../assets/avatars/government.svg";
import { createUserAction } from "../actions/user/user";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/handleError";
import { useSnackbar } from "notistack";

type NestedKeyOf<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];

const initialUserState: User = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  organizationAffiliated: [],
  organizationName: "",
  institution: "",
  address: "",
  city: "",
  country: "",
  description: "",
  keywordsActivity: [],
  fieldsProfessionalActivity: {
    generic: [],
    custom: [],
  },
  skillsOrTechnical: {
    specificTechnicsNames: [],
    equipment: [],
    models: [],
    chemicalAndBiologicalProducts: [],
    otherSkills: [],
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [],
    typeOfOrganization: [],
    projectProgressStatus: undefined,
    collaborationDuration: undefined,
  },
  avatar: "",
};

const useSignupForm = () => {
  const [user, setUser] = useState<User>(initialUserState);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const avatarUrls: { [key in OrganizationAffiliated]: string } = {
    [OrganizationAffiliated.AcademicLaboratoryAndInstitute]: AcademicAvatar,
    [OrganizationAffiliated.AcademicTechnologyPlatform]: AcademicAvatar,
    [OrganizationAffiliated.CroAndPrivateTechnologyPlatform]: CroPrivateAvatar,
    [OrganizationAffiliated.Freelancer]: FreelanceAvatar,
    [OrganizationAffiliated.NgoNonProfitOrganizationFoundation]:
      NgoNonProfitAvatar,
    [OrganizationAffiliated.Corporation]: CorporationAvatar,
    [OrganizationAffiliated.Government]: GovernmentAvatar,
  };

  const isAcademicAnyway = (organization: OrganizationAffiliated[]) =>
    (organization[0] ===
      OrganizationAffiliated.AcademicLaboratoryAndInstitute ||
      organization[0] === OrganizationAffiliated.AcademicTechnologyPlatform) &&
    (organization[1] ===
      OrganizationAffiliated.AcademicLaboratoryAndInstitute ||
      organization[1] === OrganizationAffiliated.AcademicTechnologyPlatform);

  const getAvatarByOrganization = (
    organization: OrganizationAffiliated[]
  ): string => {
    const avatar: string =
      organization.length > 1 && !isAcademicAnyway(organization)
        ? MultiAvatar
        : avatarUrls[organization[0]];
    return avatar;
  };

  useEffect(() => {
    const avatarUrl = getAvatarByOrganization(user.organizationAffiliated);
    setUser((prevUser) => ({
      ...prevUser,
      avatar: avatarUrl,
    }));
  }, [user.organizationAffiliated]);

  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    setUser({ ...user, [field]: value });
  };

  const handleChangeChip = <K extends keyof User>(
    field: K,
    item: User[K] extends Array<infer U> ? U : never
  ) => {
    setUser((prevUser) => {
      const currentArray = prevUser[field] as unknown as Array<typeof item>;
      const newArray = currentArray.includes(item)
        ? currentArray.filter((i) => i !== item)
        : [...currentArray, item];

      return { ...prevUser, [field]: newArray };
    });
  };

  const handleNestedChange = <
    K extends NestedKeyOf<User>,
    NK extends keyof User[K],
  >(
    section: K,
    field: NK,
    value: User[K][NK]
  ) => {
    setUser({
      ...user,
      [section]: {
        ...user[section],
        [field]: value,
      } as User[K],
    });
  };

  const handleNestedChip = <K extends keyof User, NK extends keyof User[K]>(
    section: K,
    field: NK,
    item: User[K][NK] extends Array<infer U> ? U : never
  ) => {
    setUser((prevUser) => {
      const sectionValue = prevUser[section];

      if (
        typeof sectionValue === "object" &&
        sectionValue !== null &&
        Array.isArray(sectionValue[field])
      ) {
        const currentArray = sectionValue[field] as unknown as Array<
          User[K][NK] extends Array<infer U> ? U : never
        >;

        const newArray = currentArray.includes(item)
          ? currentArray.filter((i) => i !== item)
          : [...currentArray, item];

        return {
          ...prevUser,
          [section]: {
            ...sectionValue,
            [field]: newArray,
          } as User[K],
        };
      } else {
        return prevUser;
      }
    });
  };

  const handleValidate = async (): Promise<void> => {
    try {
      await createUserAction(user);
      enqueueSnackbar("Signup successful", { variant: "success" });
      navigate("/login");
    } catch (err) {
      const errorMessages = getErrorMessage(err).split(",");
      errorMessages.forEach((message) =>
        enqueueSnackbar(message, { variant: "error" })
      );
    }
    console.log("user:", user);
  };

  return {
    user,
    getAvatarByOrganization,
    setUser,
    handleNestedChip,
    handleChangeChip,
    handleChange,
    handleNestedChange,
    handleValidate,
  };
};

export default useSignupForm;
