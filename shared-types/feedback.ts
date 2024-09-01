import { TypeOfOrganization } from "./user";

export interface FeedbackForm {
  userId?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  organizationAffiliated: TypeOfOrganization;
  message: string;
}
