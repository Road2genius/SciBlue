import { User } from "../../../../shared-types/userData";

export const getSkillsOrTechnicalProperties = (user: User) => [
  {
    subtitle: "Methods and specific techniques",
    label:
      "add a method or a precise technique (e.g imaging, computational models and simulation, ...)",
    keywords: user.skillsOrTechnical.specificTechnicsNames,
    key: "specificTechnicsNames",
  },
  {
    subtitle: "Equipment",
    label: "add a particular equipment (e.g. UHPLC system, ...)",
    keywords: user.skillsOrTechnical.equipment,
    key: "equipment",
  },
  {
    subtitle: "Models",
    label: "add a model (e.g. particular mouse model, ...)",
    keywords: user.skillsOrTechnical.models,
    key: "models",
  },
  {
    subtitle: "Chemical and biological products",
    label: "add a product (e.g. antibodies, cells, small molecules, ...)",
    keywords: user.skillsOrTechnical.chemicalAndBiologicalProducts,
    key: "chemicalAndBiologicalProducts",
  },
  {
    subtitle: "Any other skill that you would like to mention",
    label: "add a skill",
    keywords: user.skillsOrTechnical.otherSkills,
    key: "otherSkills",
  },
];
