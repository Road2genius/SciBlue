import { useTranslation } from "react-i18next";
import {
  CollaborationStatus,
  DiscussionStatus,
  FieldsEnvironmentalArea,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "../../../shared-types/user";

export const useTranslatedEnum = () => {
  const { t } = useTranslation();

  // Traductions pour TypeOfOrganization
  const translatedOrganizations = {
    [TypeOfOrganization.AcademicLaboratoryAndInstitute]: t("organization_affiliated_academic_laboratory_and_institute"),
    [TypeOfOrganization.AcademicTechnologyPlatform]: t("organization_affiliated_academic_technology_platform"),
    [TypeOfOrganization.NgoNonProfitOrganizationFoundation]: t(
      "organization_affiliated_ngo_non_profit_organization_foundation"
    ),
    [TypeOfOrganization.Government]: t("organization_affiliated_government"),
    [TypeOfOrganization.PrivateResearchOrganizations]: t("organization_affiliated_private_research_organizations"),
    [TypeOfOrganization.FreelanceScientist]: t("organization_affiliated_freelance_scientist"),
  };

  // Traductions pour TypeOfCollaboration
  const translatedCollaborationsType = {
    [TypeOfCollaboration.PartnershipForGrant]: t("collaboration_partnership_for_grant"),
    [TypeOfCollaboration.Sponsoring]: t("collaboration_sponsoring"),
    [TypeOfCollaboration.ExpertOpinion]: t("collaboration_expert_opinion"),
    [TypeOfCollaboration.ConductResearch]: t("collaboration_conduct_research"),
    [TypeOfCollaboration.CommunicationCampaign]: t("collaboration_communication_campaign"),
    [TypeOfCollaboration.JobPosition]: t("collaboration_job_position"),
  };

  // Traductions pour CollaborationStatus
  const translatedCollabStatus = {
    [CollaborationStatus.open]: t("collaboration_status_open"),
    [CollaborationStatus.closed]: t("collaboration_status_closed"),
  };

  // Traductions pour DiscussionStatus
  const translatedDiscussionStatus = {
    [DiscussionStatus.open]: t("questions_discussion_status_open"),
    [DiscussionStatus.closed]: t("questions_discussion_status_closed"),
  };

  // Traductions pour FieldsEnvironmentalArea
  const translatedFieldsEnvironmentalArea = {
    [FieldsEnvironmentalArea.ClimateChange]: t("fields_environmental_area_climate_change"),
    [FieldsEnvironmentalArea.Pollution]: t("fields_environmental_area_pollution"),
    [FieldsEnvironmentalArea.Biodiversity]: t("fields_environmental_area_biodiversity"),
    [FieldsEnvironmentalArea.Energy]: t("fields_environmental_area_energy"),
    [FieldsEnvironmentalArea.WasteManagement]: t("fields_environmental_area_waste_management"),
    [FieldsEnvironmentalArea.MarineConservation]: t("fields_environmental_area_marine_conservation"),
    [FieldsEnvironmentalArea.Transportation]: t("fields_environmental_area_transportation"),
    [FieldsEnvironmentalArea.ChemicalScience]: t("fields_environmental_area_chemical_science"),
    [FieldsEnvironmentalArea.PopulationImpact]: t("fields_environmental_area_population_impact"),
    [FieldsEnvironmentalArea.Health]: t("fields_environmental_area_health"),
    [FieldsEnvironmentalArea.AgriFood]: t("fields_environmental_area_agri_food"),
    [FieldsEnvironmentalArea.RessourcesManagement]: t("fields_environmental_area_ressources_management"),
    [FieldsEnvironmentalArea.Forestry]: t("fields_environmental_area_forestry"),
  };

  // Traductions pour ProjectProgressStatus
  const translatedProjectProgressStatus = {
    [ProjectProgressStatus.ConceptualizationOrDesign]: t("project_progress_status_conceptualization_or_design"),
    [ProjectProgressStatus.Starting]: t("project_progress_status_starting"),
    [ProjectProgressStatus.Ongoing]: t("project_progress_status_ongoing"),
    [ProjectProgressStatus.NearingCompletion]: t("project_progress_status_nearing_completion"),
  };

  // Traductions pour ProjectFunding
  const translatedProjectFunding = {
    [ProjectFunding.NotFunded]: t("project_funding_not_funded"),
    [ProjectFunding.LookingForFunding]: t("project_funding_looking_for_funding"),
    [ProjectFunding.Funded]: t("project_funding_funded"),
  };

  return {
    translatedOrganizations,
    translatedCollaborationsType,
    translatedCollabStatus,
    translatedFieldsEnvironmentalArea,
    translatedProjectProgressStatus,
    translatedProjectFunding,
    translatedDiscussionStatus,
  };
};
