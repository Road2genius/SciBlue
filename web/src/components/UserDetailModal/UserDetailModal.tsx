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

import {
  FieldsEnvironmentalArea,
  Languages,
} from "../../../../shared-types/user";
import useSignupForm from "../../hooks/useSignupForm";
import { UserRes } from "../../../../shared-types/userData";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FlagComponent from "../FlagComponent/FlagComponent";

const UserDialog: React.FC<{
  user?: UserRes;
  open: boolean;
  handleClose: () => void;
  getCountryCode: (countryName: string) => string | undefined;
  getLanguageCode: (languageName: string) => string | undefined;
}> = ({ user, open, handleClose, getCountryCode, getLanguageCode }) => {
  const { getAvatarByOrganization, organizationIsResearcher } = useSignupForm(
    {}
  );
  const theme = useTheme();
  const classes = useStyles();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box
          display="flex"
          flexDirection={isXs ? "column" : "row"}
          alignItems={isXs ? "center" : "flex-start"}
        >
          <Avatar
            variant="square"
            src={getAvatarByOrganization(user.organizationAffiliated)}
            sx={{
              width: isXs ? 100 : 146,
              height: isXs ? 100 : 146,
              borderRadius: "5px",
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            ml={isXs ? 0 : 4}
            mt={isXs ? 2 : 0}
            style={{ width: "100%" }}
          >
            <Box
              display="flex"
              flexDirection={isXs ? "column" : "row"}
              alignItems="center"
            >
              <FlagComponent
                countryCode={getCountryCode(user.country)?.toUpperCase()}
              />
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
                  <Box
                    display="flex"
                    justifyContent={isXs ? "center" : "flex-start"}
                    sx={{ flexWrap: "wrap" }}
                  >
                    {user.researchActivityAndExpertise.fieldsEnvironmentalArea.generic?.map(
                      (
                        genericEnvironmental: FieldsEnvironmentalArea,
                        index: number
                      ) => (
                        <Chip
                          size="small"
                          key={index}
                          label={genericEnvironmental}
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
                  <Box
                    display="flex"
                    justifyContent={isXs ? "center" : "flex-start"}
                    sx={{ flexWrap: "wrap" }}
                  >
                    {user.professionalActivityAndExpertise.fieldsEnvironmentalArea?.generic?.map(
                      (
                        genericEnvironmental: FieldsEnvironmentalArea,
                        index: number
                      ) => (
                        <Chip
                          size="small"
                          key={index}
                          label={genericEnvironmental}
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
            <Box
              my={2}
              display="flex"
              justifyContent={isXs ? "center" : "flex-start"}
            >
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
                  <VisibilityOffIcon
                    fontSize="inherit"
                    sx={{ fontSize: "50px", cursor: "pointer" }}
                  />
                </Tooltip>
              )}
            </Box>
            <Box display="flex" flexDirection={isXs ? "column" : "row"}>
              <Box
                display="flex"
                flexGrow={1}
                justifyContent={isXs ? "center" : "flex-start"}
              >
                <Chip
                  size="small"
                  label={user.organizationAffiliated}
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
              <Box
                display="flex"
                flexDirection="row"
                ml={isXs ? 0 : 1}
                justifyContent={isXs ? "center" : "flex-end"}
              >
                {user.languages.map((lang: Languages, index: number) => (
                  <Box key={index} display="flex" mr={1}>
                    <FlagComponent
                      isRound
                      countryCode={getLanguageCode(lang)?.toUpperCase()}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              display="flex"
              my={1}
              justifyContent={isXs ? "center" : "flex-start"}
            >
              {user.funder && (
                <Chip
                  size="small"
                  label="Funder"
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
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ marginTop: "30px", marginBottom: "15px" }}
              >
                Professional activity and expertise
              </Typography>
              <Typography
                variant="subtitle2"
                paragraph
                sx={{ marginBottom: "5px" }}
              >
                {user.professionalActivityAndExpertise.description}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ marginTop: "25px", marginBottom: "15px" }}
              >
                Expertises & Skills
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {user.professionalActivityAndExpertise.expertisesAndSkills.map(
                  (skill, index) => (
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
                  )
                )}
              </Box>
            </Box>
          )}
          {(organizationIsResearcher(user.organizationAffiliated) ||
            user.proDoesResearch) && (
            <Box display="flex" flexDirection="column" my={4}>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ marginTop: "30px", marginBottom: "15px" }}
              >
                Research activity and expertise
              </Typography>
              <Typography
                variant="subtitle2"
                paragraph
                sx={{ marginBottom: "5px" }}
              >
                {user.researchActivityAndExpertise.description}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ marginTop: "25px", marginBottom: "10px" }}
              >
                Disciplines
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {user.researchActivityAndExpertise.disciplines.map(
                  (discipline, index) => (
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
                  )
                )}
              </Box>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ marginTop: "25px", marginBottom: "10px" }}
              >
                Expertises & Skills
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {user.researchActivityAndExpertise.expertisesAndSkills.map(
                  (skill, index) => (
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
                  )
                )}
              </Box>
            </Box>
          )}
          {user.funder && (
            <Box my={2}>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ marginBottom: "10px" }}
              >
                {user.firstName} or its organization offers the possibility to
                fund research projects
              </Typography>
            </Box>
          )}
          <Box display="flex" flexDirection="column" my={4}>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginTop: "30px", marginBottom: "15px" }}
            >
              {user.privacyLevel.mode
                ? user.privacyLevel.username
                : user.firstName}
              &apos;s collaboration criteria
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ marginBottom: "10px" }}
            >
              With what type of organization would you be willing to
              collaborate?
            </Typography>
            <Box className={classes.chipContainer} mb={2}>
              {user.kindOfCollaborationWanted.typeOfOrganization.map(
                (organization, index) => (
                  <Chip
                    key={index}
                    label={organization}
                    sx={{
                      backgroundColor: "transparent",
                      border: "1px solid black",
                      borderRadius: "8px",
                      marginRight: "10px",
                      marginTop: " 8px",
                    }}
                  />
                )
              )}
            </Box>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ marginTop: "25px", marginBottom: "10px" }}
            >
              Project&apos;s progress status
            </Typography>
            {user.kindOfCollaborationWanted.projectProgressStatus !== "" && (
              <Box className={classes.chipContainer} mb={2}>
                <Chip
                  key={user.kindOfCollaborationWanted.projectProgressStatus}
                  label={user.kindOfCollaborationWanted.projectProgressStatus}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "transparent",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginTop: " 8px",
                  }}
                />
              </Box>
            )}

            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ marginTop: "25px", marginBottom: "10px" }}
            >
              Project&apos;s funding
            </Typography>
            {user.kindOfCollaborationWanted.projectFunding !== "" && (
              <Box className={classes.chipContainer} mb={2}>
                <Chip
                  key={user.kindOfCollaborationWanted.projectFunding}
                  label={user.kindOfCollaborationWanted.projectFunding}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "transparent",

                    border: "1px solid black",
                    borderRadius: "8px",
                    marginTop: " 8px",
                  }}
                />
              </Box>
            )}
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
          Close
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
