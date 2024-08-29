import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Link,
  Button,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { FieldsEnvironmentalArea, Languages } from "../../../../shared-types/user";
import useSignupForm from "../../hooks/useSignupForm";
import { UserRes } from "../../../../shared-types/userData";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FlagComponent from "../FlagComponent/FlagComponent";
import { getAvatar } from "../Navbar/avatar";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

const UserDialog: React.FC<{
  user?: UserRes;
  open: boolean;
  handleClose: () => void;
  getCountryCode: (countryName: string) => string | undefined;
  getLanguageCode: (languageName: string) => string | undefined;
}> = ({ user, open, handleClose, getCountryCode, getLanguageCode }) => {
  const { organizationIsResearcher } = useSignupForm({});
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    translatedProjectProgressStatus,
    translatedProjectFunding,
    translatedFieldsEnvironmentalArea,
    translatedOrganizations,
  } = useTranslatedEnum();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const userName = user?.privacyLevel.mode ? user?.privacyLevel.username : user?.firstName;

  if (!user) return;

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      PaperComponent={(props) => (
        <Paper
          {...props}
          elevation={24}
          sx={{
            padding: isXs ? "15px" : "30px",
            borderRadius: "8px",
          }}
        />
      )}
    >
      <Box display="flex" justifyContent="flex-end" mt={-2} mr={-2}>
        <IconButton onClick={handleClose}>
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection={isXs ? "column" : "row"} alignItems={isXs ? "center" : "flex-start"}>
          <Avatar
            variant="square"
            src={getAvatar(user.avatar)}
            sx={{
              width: isXs ? 100 : 146,
              height: isXs ? 100 : 146,
              borderRadius: "5px",
            }}
          />
          <Box display="flex" flexDirection="column" ml={isXs ? 0 : 4} mt={isXs ? 2 : 0} style={{ width: "100%" }}>
            <Box display="flex" flexDirection={isXs ? "column" : "row"} alignItems="center">
              <FlagComponent countryCode={getCountryCode(user.country)?.toUpperCase()} />
              {!user.privacyLevel.mode ? (
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: isXs ? 0 : "15px",
                    marginTop: isXs ? "10px" : "5px",
                    textAlign: isXs ? "center" : "left",
                    flexGrow: 1,
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: isXs ? 0 : "15px",
                    marginTop: isXs ? "10px" : "5px",
                    textAlign: isXs ? "center" : "left",
                    flexGrow: 1,
                  }}
                >
                  {user.privacyLevel.username}
                </Typography>
              )}
              <Box display="flex" flexDirection="row" mt={isXs ? 2 : 1}>
                {organizationIsResearcher(user.organizationAffiliated) ? (
                  <Box display="flex" justifyContent={isXs ? "center" : "flex-start"} sx={{ flexWrap: "wrap" }}>
                    {user.researchActivityAndExpertise.fieldsEnvironmentalArea.generic?.map(
                      (genericEnvironmental: FieldsEnvironmentalArea, index: number) => (
                        <Chip
                          size="small"
                          key={index}
                          label={translatedFieldsEnvironmentalArea[genericEnvironmental]}
                          variant="outlined"
                          sx={{
                            backgroundColor: "#C8E6C9",
                            border: "1px solid black",
                            borderRadius: "8px",
                            marginRight: "5px",
                            marginTop: "5px",
                          }}
                        />
                      )
                    )}
                  </Box>
                ) : (
                  <Box display="flex" justifyContent={isXs ? "center" : "flex-start"} sx={{ flexWrap: "wrap" }}>
                    {user.professionalActivityAndExpertise.fieldsEnvironmentalArea?.generic?.map(
                      (genericEnvironmental: FieldsEnvironmentalArea, index: number) => (
                        <Chip
                          size="small"
                          key={index}
                          label={translatedFieldsEnvironmentalArea[genericEnvironmental]}
                          variant="outlined"
                          sx={{
                            backgroundColor: "#C8E6C9",
                            border: "1px solid black",
                            borderRadius: "8px",
                            marginRight: "5px",
                            marginTop: "5px",
                          }}
                        />
                      )
                    )}
                  </Box>
                )}
              </Box>
            </Box>
            <Box my={2} display="flex" justifyContent={isXs ? "center" : "flex-start"}>
              {!user.privacyLevel.mode ? (
                <Link
                  href={`mailto:${user.email}`}
                  underline="none"
                  sx={{
                    color: "#008080",
                    textAlign: isXs ? "center" : "left",
                  }}
                >
                  {user.email}
                </Link>
              ) : (
                <Tooltip title="This user has activated private mode">
                  <VisibilityOffIcon fontSize="inherit" sx={{ fontSize: "50px", cursor: "pointer" }} />
                </Tooltip>
              )}
            </Box>
            <Box display="flex" flexDirection={isXs ? "column" : "row"}>
              <Box display="flex" flexGrow={1} justifyContent={isXs ? "center" : "flex-start"}>
                <Chip
                  size="small"
                  label={translatedOrganizations[user.organizationAffiliated]}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#DAD7CD",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginBottom: isXs ? "10px" : 0,
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" ml={isXs ? 0 : 1} justifyContent={isXs ? "center" : "flex-end"}>
                {user.languages.map((lang: Languages, index: number) => (
                  <Box key={index} display="flex" mr={1}>
                    <FlagComponent isRound countryCode={getLanguageCode(lang)?.toUpperCase()} />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box display="flex" my={1} justifyContent={isXs ? "center" : "flex-start"}>
              {user.funder && (
                <Chip
                  size="small"
                  label={t("community_page_funder")}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#DEE126",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginRight: "5px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Container maxWidth="lg">
          {!organizationIsResearcher(user.organizationAffiliated) && (
            <Box display="flex" flexDirection="column" my={4}>
              <Typography variant="h5" fontWeight={600} sx={{ marginTop: "30px", marginBottom: "15px" }}>
                <Trans i18nKey="user_detail_professional_activity" />
              </Typography>
              <Typography variant="subtitle2" paragraph sx={{ marginBottom: "5px" }}>
                {user.professionalActivityAndExpertise.description}
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ marginTop: "25px", marginBottom: "15px" }}>
                <Trans i18nKey="create_request_specifics_detail_expertises_and_skills_title" />
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {user.professionalActivityAndExpertise.expertisesAndSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid black",
                      borderRadius: "8px",
                      marginRight: "8px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          {(organizationIsResearcher(user.organizationAffiliated) || user.proDoesResearch) && (
            <Box display="flex" flexDirection="column" my={4}>
              <Typography variant="h5" fontWeight={600} sx={{ marginTop: "30px", marginBottom: "15px" }}>
                <Trans i18nKey="user_detail_research_activity" />
              </Typography>
              <Typography variant="subtitle2" paragraph sx={{ marginBottom: "5px" }}>
                {user.researchActivityAndExpertise.description}
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ marginTop: "25px", marginBottom: "10px" }}>
                <Trans i18nKey="research_activity_and_expertise_disciplines" />
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {user.researchActivityAndExpertise.disciplines.map((discipline, index) => (
                  <Chip
                    key={index}
                    label={`${discipline.primary} - ${discipline.secondary}`}
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid black",
                      borderRadius: "8px",
                      marginRight: "8px",
                    }}
                  />
                ))}
              </Box>
              <Typography variant="body1" fontWeight={600} sx={{ marginTop: "25px", marginBottom: "10px" }}>
                <Trans i18nKey="create_request_specifics_detail_expertises_and_skills_title" />
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {user.researchActivityAndExpertise.expertisesAndSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid black",
                      borderRadius: "8px",
                      marginRight: "8px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          {user.funder && (
            <Box my={2}>
              <Typography variant="body1" fontWeight={600} sx={{ marginBottom: "10px" }}>
                {user.firstName} <Trans i18nKey="user_detail_can_fund_projects" />
              </Typography>
            </Box>
          )}
          <Box display="flex" flexDirection="column" my={4}>
            <Typography variant="h5" fontWeight={600} sx={{ marginTop: "30px", marginBottom: "15px" }}>
              <Trans i18nKey="user_detail_criteria" values={{ userName }} />
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ marginBottom: "10px" }}>
              <Trans i18nKey="user_detail_organization_wanted" />
            </Typography>
            <Box className={classes.chipContainer} mb={2}>
              {user.kindOfCollaborationWanted.typeOfOrganization.map((organization, index) => (
                <Chip
                  key={index}
                  label={translatedOrganizations[organization]}
                  sx={{
                    backgroundColor: "transparent",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginRight: "10px",
                    marginTop: " 8px",
                  }}
                />
              ))}
            </Box>
            <Typography variant="body1" fontWeight={600} sx={{ marginTop: "25px", marginBottom: "10px" }}>
              <Trans i18nKey="interest_selection_project_progress_status_title" />
            </Typography>
            <Box className={classes.chipContainer} mb={2}>
              {user.kindOfCollaborationWanted.projectProgressStatus.map((projectStatut, index) => (
                <Chip
                  key={index}
                  label={translatedProjectProgressStatus[projectStatut]}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "transparent",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginTop: " 8px",
                  }}
                />
              ))}
            </Box>

            <Typography variant="body1" fontWeight={600} sx={{ marginTop: "25px", marginBottom: "10px" }}>
              <Trans i18nKey="interest_selection_project_funding_title" />
            </Typography>
            <Box className={classes.chipContainer} mb={2}>
              {user.kindOfCollaborationWanted.projectFunding.map((projectFunding, index) => (
                <Chip
                  key={index}
                  label={translatedProjectFunding[projectFunding]}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "transparent",

                    border: "1px solid black",
                    borderRadius: "8px",
                    marginTop: " 8px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            borderRadius: "8px",
            textTransform: "none",
            height: "50px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            marginY: "20px",
          }}
        >
          <Trans i18nKey="user_detail_close_dialog" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  chipContainer: {
    maxWidth: "800px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5px",
    alignItems: "center",
  },
});

export default UserDialog;
