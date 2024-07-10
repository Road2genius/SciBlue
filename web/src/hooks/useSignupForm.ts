import { useState } from "react";
import { User } from "../../../shared-types/userData";

const initialUserState: User = {
  _id: "",
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
  fieldsProfessionalActivity: [],
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
    projectProgressStatus: [],
    collaborationDuration: [],
  },
  createdAt: undefined,
  updatedAt: undefined,
};

const useSignupForm = () => {
  const [user, setUser] = useState<User>(initialUserState);

  const handleChange = (field: keyof User, value: any) => {
    setUser({ ...user, [field]: value });
  };

  const handleNestedChange = (
    section: keyof User,
    field: string,
    value: any
  ) => {
    setUser({
      ...user,
      [section]: {
        ...(user[section] as any),
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
