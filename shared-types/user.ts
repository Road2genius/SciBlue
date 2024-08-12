// export enum OrganizationAffiliated {
//   AcademicLaboratoryAndInstitute = "Academic laboratory and institute",
//   AcademicTechnologyPlatform = "Academic technology platform",
//   NgoNonProfitOrganizationFoundation = "NGO, non-profit organization, foundation",
//   Government = "Government",
//   CroAndPrivateTechnologyPlatform = "CRO and private technology platform",
//   Corporation = "Corporation",
//   Freelancer = "Freelancer",
// }

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

export enum FieldsEnvironmentalArea {
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

export enum Languages {
  English = "English",
  Spanish = "Spanish",
  MandarinChinese = "Mandarin Chinese",
  Hindi = "Hindi",
  Arabic = "Arabic",
  Portuguese = "Portuguese",
  Bengali = "Bengali",
  Russian = "Russian",
  Japanese = "Japanese",
  WesternPunjabi = "Western Punjabi",
  Marathi = "Marathi",
  Telugu = "Telugu",
  WuChinese = "Wu Chinese",
  Turkish = "Turkish",
  Korean = "Korean",
  French = "French",
  German = "German",
  Vietnamese = "Vietnamese",
  Tamil = "Tamil",
  YueChineseCantonese = "Yue Chinese (Cantonese)",
  Urdu = "Urdu",
  Javanese = "Javanese",
  Italian = "Italian",
  EgyptianArabic = "Egyptian Arabic",
  Gujarati = "Gujarati",
  IranianPersian = "Iranian Persian",
  Bhojpuri = "Bhojpuri",
  SouthernMin = "Southern Min",
  HakkaChinese = "Hakka Chinese",
  JinChinese = "Jin Chinese",
  Hausa = "Hausa",
  Kannada = "Kannada",
  Indonesian = "Indonesian",
  Polish = "Polish",
  Yoruba = "Yoruba",
  Malayalam = "Malayalam",
  OdiaOriya = "Odia (Oriya)",
  Maithili = "Maithili",
  Burmese = "Burmese",
  EasternPunjabi = "Eastern Punjabi",
  Somali = "Somali",
  Cebuano = "Cebuano",
  Dutch = "Dutch",
  Kurdish = "Kurdish",
  SerboCroatian = "Serbo-Croatian",
  Sinhalese = "Sinhalese",
  Chittagonian = "Chittagonian",
  Kazakh = "Kazakh",
  Malagasy = "Malagasy",
  FilipinoTagalog = "Filipino (Tagalog)",
}

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
