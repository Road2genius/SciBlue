import { useEffect, useState } from "react";
import { User } from "../../../shared-types/userData";
import AcademicAvatar from "../assets/avatars/academic.svg";
import FreelanceAvatar from "../assets/avatars/freelancer.svg";
import GovernmentAvatar from "../assets/avatars/government.svg";
import OngAvatar from "../assets/avatars/ong.svg";
import PrivateAvatar from "../assets/avatars/privateResearch.svg";
import { createUserAction } from "../actions/user/user";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/handleError";
import { useSnackbar } from "notistack";
import {
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfOrganization,
} from "../../../shared-types/user";
import { NestedKeyOf } from "../../../shared-types/requestData";

const initialUserState: User = {
  _id: "",
  organizationAffiliated: "" as TypeOfOrganization,
  privacyLevel: {
    mode: false,
    username: "",
  },
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  organizationName: "",
  typeOfOrganizationSpecific: "",
  country: "",
  languages: [],
  institution: "",
  profileVerificationInfo: "",
  researchActivityAndExpertise: {
    description: "",
    disciplines: [],
    expertisesAndSkills: [],
    fieldsEnvironmentalArea: {
      generic: [],
      custom: [],
    },
    fieldsApplicationArea: [],
  },
  professionalActivityAndExpertise: {
    fieldsEnvironmentalArea: {
      generic: [],
      custom: [],
    },
    description: "",
    expertisesAndSkills: [],
  },
  kindOfCollaborationWanted: {
    typeOfOrganization: [],
    projectProgressStatus: "" as ProjectProgressStatus,
    projectFunding: "" as ProjectFunding,
  },
  avatar: "",
  refreshToken: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const useSignupForm = () => {
  const [user, setUser] = useState<User>(initialUserState);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const avatarUrls: { [key in TypeOfOrganization]: string } = {
    [TypeOfOrganization.AcademicLaboratoryAndInstitute]: AcademicAvatar,
    [TypeOfOrganization.AcademicTechnologyPlatform]: AcademicAvatar,
    [TypeOfOrganization.FreelanceScientist]: FreelanceAvatar,
    [TypeOfOrganization.Government]: GovernmentAvatar,
    [TypeOfOrganization.NgoNonProfitOrganizationFoundation]: OngAvatar,
    [TypeOfOrganization.PrivateResearchOrganizations]: PrivateAvatar,
  };

  const getAvatarByOrganization = (
    organization?: TypeOfOrganization
  ): string | undefined => {
    if (organization) {
      return avatarUrls[organization];
    }
  };

  const organizationIsResearcher = (organization: string): boolean =>
    organization === TypeOfOrganization.AcademicLaboratoryAndInstitute ||
    organization === TypeOfOrganization.AcademicTechnologyPlatform ||
    organization === TypeOfOrganization.PrivateResearchOrganizations ||
    organization === TypeOfOrganization.FreelanceScientist;

  useEffect(() => {
    const avatarUrl = getAvatarByOrganization(
      user.organizationAffiliated ?? undefined
    );
    if (user.organizationAffiliated && avatarUrl) {
      setUser((prevUser) => ({
        ...prevUser,
        avatar: avatarUrl,
      }));
    }
  }, [user.organizationAffiliated]);

  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    setUser({ ...user, [field]: value });
  };

  // const handleChangeChip = <T>(
  //   field: keyof User,
  //   item: T
  // ) => {
  //   setUser((prevUser) => {
  //     const currentArray = (prevUser[field] as unknown as T[]) || [];

  //     const newArray = currentArray.includes(item)
  //       ? currentArray.filter((i) => i !== item)
  //       : [...currentArray, item];

  //     return { ...prevUser, [field]: newArray };
  //   });
  // };


  const handleChangeChip = <T>(field: keyof User, item: T) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: item,
    }));
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
    organizationIsResearcher,
  };
};

export default useSignupForm;
