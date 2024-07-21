import { body, ValidationChain } from "express-validator";

export const validateCreateRequest = (): ValidationChain[] => [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("project.projectTitle").notEmpty().withMessage("Project Title is required"),
  body("project.projectProgressStatus").notEmpty().withMessage("Project Progress Status is required"),
  body("project.collaborationDuration.duration").notEmpty().withMessage("Collaboration Duration is required"),
  body("kindOfCollaborationWanted.typeOfCollaboration").notEmpty().withMessage("Type of Collaboration is required"),
  body("kindOfCollaborationWanted.requestTitle").notEmpty().withMessage("Request Title is required"),
  body("kindOfCollaborationWanted.description").notEmpty().withMessage("Description is required"),
];
