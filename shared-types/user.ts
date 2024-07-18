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
  DirectFunding = "Direct funding",
  ExpertAnalysis = "Expert analysis/bibliographic research",
  CommunicationCampaign = "Communication campaign",
  ExperimentConducting = "Experiment conducting",
}

export enum TypeOfOrganization {
  AcademicLaboratoryAndInstitute = "Academic laboratory and institute",
  AcademicTechnologyPlatform = "Academic technology platform",
  NgoNonProfitOrganizationFoundation = "NGO, non-profit organization, foundation",
  Government = "Government",
  CroAndPrivateTechnologyPlatform = "CRO and private technology platform",
  Corporation = "Corporation",
  Freelancer = "Freelancer",
}

export enum ProjectProgressStatus {
  NotFunded = "Not funded",
  FundedButNotStarted = "Funded but not started",
  Ongoing = "Ongoing",
  NearingCompletion = "Nearing completion, i.e. manuscript being written or under review",
}

export enum CollaborationDuration {
  LongTermCollaboration = "Long-term collaboration",
  ShortTermOrOneTimeExperiment = "Short term or one time experiment",
}

export enum FieldsProfessionalActivity {
  ClimateChange = "Climate change",
  Pollution = "Pollution",
  Biodiversity = "Biodiversity",
  RenewableEnergy = "Renewable energy",
  AgriFood = "Agri-food",
  AquaticEcosystems = "Aquatic ecosystems",
  Transportation = "Transportation",
  ChemicalScience = "Chemical science",
  PopulationMovement = "Population movement",
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
