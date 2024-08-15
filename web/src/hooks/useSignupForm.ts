import { useEffect, useState } from "react";
import { UserReq, UserRes } from "../../../shared-types/userData";
import AcademicAvatar from "../assets/avatars/academic.svg";
import FreelanceAvatar from "../assets/avatars/freelancer.svg";
import GovernmentAvatar from "../assets/avatars/government.svg";
import OngAvatar from "../assets/avatars/ong.svg";
import PrivateAvatar from "../assets/avatars/privateResearch.svg";
import { createUserAction, deleteUserAction, updateUserAction } from "../actions/user/user";
import { getErrorMessage } from "../utils/handleError";
import { useSnackbar } from "notistack";
import {
  CountryNames,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfOrganization,
} from "../../../shared-types/user";
import { Discipline, NestedKeyOf } from "../../../shared-types/requestData";

const initialUserState: UserReq = {
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
  country: "" as CountryNames,
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
  funder: false,
  proDoesResearch: false,
  avatar: "",
  refreshToken: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface UseUserFormProps {
  onSuccessSignIn?: () => void;
  onSuccessUpdateUser?: () => void;
  onErrorUpdateUser?: () => void;
  onSuccessDeleteUser?: () => void;
  onErrorDeleteUser?: () => void
  profileInformation?: UserRes;
}

const useSignupForm = ({
  onSuccessSignIn,
  onSuccessUpdateUser,
  onErrorUpdateUser,
  onSuccessDeleteUser,
  onErrorDeleteUser,
  profileInformation,
}: UseUserFormProps) => {
  const [user, setUser] = useState<UserReq>(
    profileInformation || initialUserState
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (profileInformation) {
      setUser(profileInformation);
    }
  }, [profileInformation]);

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

  const handleChange = <K extends keyof UserReq>(
    field: K,
    value: UserReq[K]
  ) => {
    setUser({ ...user, [field]: value });
  };

  const handleDeleteChipLanguage = (langToDelete: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      languages: prevUser.languages.filter((lang) => lang !== langToDelete),
    }));
  };

  const handleDeleteChipCountry = () => {
    setUser((prevUser) => ({
      ...prevUser,
      country: "" as CountryNames,
    }));
  };

  const handleDeleteChipDiscipline = (disciplineToDelete: Discipline) => {
    setUser((prevUser) => ({
      ...prevUser,
      researchActivityAndExpertise: {
        ...prevUser.researchActivityAndExpertise,
        disciplines: prevUser.researchActivityAndExpertise.disciplines.filter(
          (discipline) =>
            !(
              discipline.primary === disciplineToDelete.primary &&
              discipline.secondary === disciplineToDelete.secondary
            )
        ),
      },
    }));
  };

  const handleChangeLanguage = <K extends keyof UserReq>(
    field: K,
    value: UserReq[K]
  ) => {
    setUser((prevUser) => {
      const currentArray = (prevUser[field] as unknown as Array<unknown>) || [];

      const newArray = Array.isArray(value) ? value : [value];

      const updatedArray = [...currentArray, ...newArray].filter(
        (item, index, self) => self.indexOf(item) === index
      );

      return {
        ...prevUser,
        [field]: updatedArray as UserReq[K],
      };
    });
  };

  const handleChangeChip = <T>(field: keyof UserReq, item: T) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: item,
    }));
  };

  const handleNestedChange = <
    K extends NestedKeyOf<UserReq>,
    NK extends keyof UserReq[K],
  >(
    section: K,
    field: NK,
    value: UserReq[K][NK]
  ) => {
    setUser({
      ...user,
      [section]: {
        ...user[section],
        [field]: value,
      } as UserReq[K],
    });
  };

  const handleNestedArrayChange = <
    K extends NestedKeyOf<UserReq>,
    NK extends keyof UserReq[K],
  >(
    section: K,
    field: NK,
    value: UserReq[K][NK] extends Array<infer U> ? U[] : never
  ) => {
    setUser((prevUser) => {
      const currentArray =
        (prevUser[section][field] as unknown as UserReq[K][NK] extends Array<
          infer U
        >
          ? U[]
          : never) || [];

      const newArray = currentArray.some((item) => value.includes(item))
        ? currentArray.filter((item) => !value.includes(item))
        : [...currentArray, ...value];

      return {
        ...prevUser,
        [section]: {
          ...prevUser[section],
          [field]: newArray,
        } as UserReq[K],
      };
    });
  };

  const handleNestedChip = <
    K extends keyof UserReq,
    NK extends keyof UserReq[K],
  >(
    section: K,
    field: NK,
    item: UserReq[K][NK] extends Array<infer U> ? U : UserReq[K][NK]
  ) => {
    setUser((prevUser) => {
      const sectionValue = prevUser[section];

      if (
        sectionValue &&
        typeof sectionValue === "object" &&
        !Array.isArray(sectionValue)
      ) {
        const fieldValue = sectionValue[field];

        if (Array.isArray(fieldValue)) {
          const currentArray = fieldValue as unknown as Array<
            UserReq[K][NK] extends Array<infer U> ? U : UserReq[K][NK]
          >;

          const newArray = currentArray.includes(item)
            ? currentArray.filter((i) => i !== item)
            : [...currentArray, item];

          return {
            ...prevUser,
            [section]: {
              ...sectionValue,
              [field]: newArray,
            } as UserReq[K],
          };
        } else if (typeof fieldValue === "object" && fieldValue !== null) {
          return {
            ...prevUser,
            [section]: {
              ...sectionValue,
              [field]: { ...fieldValue, item },
            } as UserReq[K],
          };
        } else {
          return {
            ...prevUser,
            [section]: {
              ...sectionValue,
              [field]: item,
            } as UserReq[K],
          };
        }
      } else {
        return prevUser;
      }
    });
  };

  const handleDoubleNestedChip = <
    K extends keyof UserReq,
    NK extends keyof UserReq[K],
    NK2 extends keyof UserReq[K][NK],
  >(
    section: K,
    nestedSection: NK,
    field: NK2,
    item: UserReq[K][NK][NK2] extends Array<infer U> ? U : never
  ) => {
    setUser((prevUser: UserReq) => {
      const sectionValue = prevUser[section];

      if (
        typeof sectionValue === "object" &&
        sectionValue !== null &&
        typeof sectionValue[nestedSection] === "object" &&
        sectionValue[nestedSection] !== null &&
        Array.isArray(sectionValue[nestedSection][field])
      ) {
        const currentArray = sectionValue[nestedSection][
          field
        ] as unknown as Array<
          UserReq[K][NK][NK2] extends Array<infer U> ? U : never
        >;

        const newArray = currentArray.includes(item)
          ? currentArray.filter((i) => i !== item)
          : [...currentArray, item];

        return {
          ...prevUser,
          [section]: {
            ...sectionValue,
            [nestedSection]: {
              ...sectionValue[nestedSection],
              [field]: newArray,
            } as UserReq[K][NK],
          } as UserReq[K],
        };
      } else {
        return prevUser;
      }
    });
  };

  const handleDoubleNestedChange = <
    K extends keyof UserReq,
    NK extends keyof UserReq[K],
    NK2 extends keyof UserReq[K][NK],
  >(
    section: K,
    nestedSection: NK,
    field: NK2,
    value: UserReq[K][NK][NK2]
  ) => {
    setUser((prevUser: UserReq) => {
      const sectionValue = prevUser[section];
      if (
        typeof sectionValue === "object" &&
        sectionValue !== null &&
        typeof sectionValue[nestedSection] === "object" &&
        sectionValue[nestedSection] !== null
      ) {
        return {
          ...prevUser,
          [section]: {
            ...sectionValue,
            [nestedSection]: {
              ...sectionValue[nestedSection],
              [field]: value,
            },
          },
        };
      }
      return prevUser;
    });
  };

  const handleValidate = async (): Promise<void> => {
    try {
      await createUserAction(user);
      onSuccessSignIn && onSuccessSignIn();
    } catch (err) {
      const errorMessages = getErrorMessage(err).split(",");
      errorMessages.forEach((message) =>
        enqueueSnackbar(message, { variant: "error" })
      );
    }
  };

  const handleUpdateUser = async (
    userId: string,
    userDetail: UserRes
  ): Promise<void> => {
    try {
      await updateUserAction(userId, userDetail);
      onSuccessUpdateUser && onSuccessUpdateUser();
    } catch (err) {
      onErrorUpdateUser && onErrorUpdateUser();
    }
  };

  const handleDeleteUser = async (userId: string): Promise<void> => {
    try {
      await deleteUserAction(userId);
      onSuccessDeleteUser && onSuccessDeleteUser();
    } catch (err) {
      onErrorDeleteUser && onErrorDeleteUser();
    }
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
    handleChangeLanguage,
    handleDeleteChipLanguage,
    handleDeleteChipCountry,
    handleNestedArrayChange,
    handleDeleteChipDiscipline,
    handleDoubleNestedChip,
    handleDoubleNestedChange,
    handleUpdateUser,
    handleDeleteUser,
  };
};

export default useSignupForm;
