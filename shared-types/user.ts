export enum OrganizationAffiliated {
  AcademicLaboratoryAndInstitute = "Academic laboratory and institute",
  AcademicTechnologyPlatform = "Academic technology platform",
  NgoNonProfitOrganizationFoundation = "NGO, non-profit organization, foundation",
  Government = "Government",
  CroAndPrivateTechnologyPlatform = "CRO and private technology platform",
  Corporation = "Corporation",
  Freelancer = "Freelancer",
}

export enum TypeOfCollaboration {
  PartnershipForGrant = "Partnership for a grant",
  Sponsoring = "Sponsoring",
  ExpertOpinion = "Expert opinion / literature review",
  ConductResearch = "Conduct research",
  CommunicationCampaign = "Communication campaign",
  JobPosition = "Job position",
}

export enum TypeOfOrganization {
  AcademicLaboratoryAndInstitute = "Academic laboratory and institute",
  AcademicTechnologyPlatform = "Academic technology platform",
  NgoNonProfitOrganizationFoundation = "NGO, non-profit organization, foundation",
  Government = "Government",
  PrivateResearchOrganizations = "Private research organizations",
  FreelanceScientist = "Freelance scientist",
}

export enum ProjectProgressStatus {
  ConceptualizationOrDesign = "Conceptualization/Design",
  Starting = "Starting",
  Ongoing = "Ongoing",
  NearingCompletion = "Nearing completion",
}

export enum ProjectFunding {
  NotFunded = "Not funded",
  LookingForFunding = "Looking for funding",
  Funded = "Funded",
}

export enum CollaborationDuration {
  LongTermCollaboration = "Long-term collaboration",
  ShortTermOrOneTimeExperiment = "Short term or one time experiment",
}

export enum CollaborationStatus {
  open = "Open",
  closed = "Closed",
}

export enum CollaborationVote {
  positive = "positive",
  negative = "negative",
}

export enum FieldsProfessionalActivity {
  ClimateChange = "Climate change",
  Pollution = "Pollution",
  Biodiversity = "Biodiversity",
  Energy = "Energy",
  WasteManagement = "Waste management",
  MarineConservation = "Marine conservation",
  Transportation = "Transportation",
  ChemicalScience = "Chemical science",
  PopulationImpact = "Population impact",
  Health = "Health",
  AgriFood = "Agri-food",
  RessourcesManagement = "Ressources management",
  Forestry = "Forestry",
}

export type SkillsOrTechnicalKeys =
  | "specificTechnicsNames"
  | "equipment"
  | "models"
  | "chemicalAndBiologicalProducts"
  | "otherSkills";

export function getEnumValues<T extends { [key: string]: string | number }>(
  enumObj: T
): string[] {
  return Object.values(enumObj).filter(
    (value) => typeof value === "string"
  ) as string[];
}

export function isValidEnumOrCustomString<
  T extends { [key: string]: string | number }
>(enumObj: T) {
  const enumValues = getEnumValues(enumObj);
  return (value: string): boolean => {
    return enumValues.includes(value) || typeof value === "string";
  };
}
