import { useState } from "react";
import { User } from "../../../shared-types/userData";

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
    custom: []
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
};

const useSignupForm = () => {
  const [user, setUser] = useState<User>(initialUserState);

  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    setUser({ ...user, [field]: value });
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
      },
    });
  };

  return {
    user,
    handleChange,
    handleNestedChange,
  };
};

export default useSignupForm;
