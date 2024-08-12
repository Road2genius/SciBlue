import { body, ValidationChain } from "express-validator";

export const validateCreateRequest = (): ValidationChain[] => [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("project.projectTitle").notEmpty().withMessage("Project title is required"),
  body("project.fieldsEnvironmentalArea").notEmpty().withMessage("Fields of environmental area is required"),
  body("project.projectProgressStatus").notEmpty().withMessage("Project progress status is required"),
  body("kindOfCollaborationWanted.typeOfCollaboration").notEmpty().withMessage("Type of collaboration is required"),
  body("kindOfCollaborationWanted.requestTitle").notEmpty().withMessage("Request title is required"),
  body("kindOfCollaborationWanted.description").notEmpty().withMessage("Request description is required"),
];
