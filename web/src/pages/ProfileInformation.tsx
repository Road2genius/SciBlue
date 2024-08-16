import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { UserRes } from "../../../shared-types/userData";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { getUserByIdAction } from "../actions/user/user";
import { useNavigate, useParams } from "react-router-dom";
import useSignupForm from "../hooks/useSignupForm";
import OrganizationChips from "../components/OrganizationChips/OrganizationChips";
import InterestSelector from "../components/InterestSelection/InterestSelection";
import ProfessionalActivity from "../components/ProfessionalActivity/ProfessionalActiviy";
import ResearchActivity from "../components/ResearchActivity/ResearchActivity";
import ConditionalTextFields from "../components/ConditionalTextFields/ConditionalTextFields";
import PrivacyLevel from "../components/PrivacyLevel/PrivacyLevel";
import LoginInformation from "../components/LoginInformation/LoginInformation";
import { getTextFieldsConfig } from "../components/CustomTextField/getTextFieldsConfig";
import { useSnackbar } from "notistack";
import DeleteEntityDialog from "../components/DeleteEntityDialog/DeleteEntityDialog";
import { useUserContext } from "../context/UserContext";

const ProfileInformation: React.FC = () => {
  const { userId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStyles();
  const [profileInformation, setProfileInformation] = useState<UserRes>();
  const { setUserContext } = useUserContext();
  const [openDialogDeleteUser, setOpenDialogDeleteUser] =
    useState<boolean>(false);

  const {
    user,
    handleChangeChip,
    organizationIsResearcher,
    handleNestedChange,
    handleChange,
    handleChangeLanguage,
    handleDeleteChipLanguage,
    handleDeleteChipCountry,
    handleDeleteChipDiscipline,
    handleDoubleNestedChip,
    handleDoubleNestedChange,
    handleNestedChip,
    getAvatarByOrganization,
    handleUpdateUser,
    handleDeleteUser,
  } = useSignupForm({
    profileInformation: profileInformation,
    onSuccessUpdateUser: () =>
      enqueueSnackbar("Profile information updated successful", {
        variant: "success",
      }),
    onErrorUpdateUser: () =>
      enqueueSnackbar("Profile information updated error", {
        variant: "error",
      }),
    onSuccessDeleteUser: () =>
      enqueueSnackbar("Profile user has been deleted", {
        variant: "warning",
      }),
    onErrorDeleteUser: () =>
      enqueueSnackbar("Profile user deleted error", {
        variant: "error",
      }),
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await getUserByIdAction(userId);
          setProfileInformation(response);
        }
      } catch (error) {
        console.error("Failed to fetch request details", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const textFields = getTextFieldsConfig(user);

  const handleEditProfileInformation = () => {
    const profileInformationToUpdate: UserRes = {
      ...user,
      _id: profileInformation!._id,
    };
    handleUpdateUser(
      profileInformationToUpdate._id,
      profileInformationToUpdate
    );
    setUserContext({
      userId: profileInformationToUpdate._id,
      avatar: profileInformationToUpdate.avatar,
    });
    navigate(`/community`);
  };

  const handleDeleteUserDialog = () => {
    handleDeleteUser(profileInformation!._id);
    setOpenDialogDeleteUser(false);
    setUserContext(null);
    navigate("/community");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          className={classes.root}
          sx={{
            minWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "1200px",
            },
          }}
        >
          <Typography variant="h4" fontWeight={700} color="#197278" mb={4}>
            Profile information
          </Typography>
          <Grid container>
            <Grid item xs={12} md={11}>
              <Typography variant="h5" fontWeight={600} my={2}>
                Type of organization you are affiliated with*
              </Typography>
              <OrganizationChips
                selectedOrganizations={user.organizationAffiliated}
                handleChange={(label) =>
                  handleChangeChip("organizationAffiliated", label)
                }
              />
              <Box mt={8} mb={5} ml={8}>
                <Divider
                  variant="fullWidth"
                  sx={{
                    borderBottomWidth: 1.5,
                    minWidth: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      lg: "100%",
                      xl: "1250px",
                    },
                  }}
                />
              </Box>
              {organizationIsResearcher(user.organizationAffiliated) && (
                <PrivacyLevel
                  privacyMode={user.privacyLevel.mode}
                  username={user.privacyLevel.username}
                  handlePrivacyModeChange={(checked) =>
                    handleNestedChange("privacyLevel", "mode", checked)
                  }
                  handleUsernameChange={(username) =>
                    handleNestedChange("privacyLevel", "username", username)
                  }
                />
              )}
              <LoginInformation
                textFields={textFields}
                handleChange={handleChange}
                fromProfileInformation
                user={user}
              />
              <ConditionalTextFields
                user={user}
                handleChange={handleChange}
                handleChangeChip={handleChangeChip}
                handleChangeLanguage={handleChangeLanguage}
                handleDeleteChipLanguage={handleDeleteChipLanguage}
                handleDeleteChipCountry={handleDeleteChipCountry}
                organizationIsResearcher={organizationIsResearcher(
                  user.organizationAffiliated
                )}
              />
              {organizationIsResearcher(user.organizationAffiliated) ? (
                <ResearchActivity
                  user={user}
                  handleNestedChange={handleNestedChange}
                  handleDeleteChipDiscipline={handleDeleteChipDiscipline}
                  handleDoubleNestedChip={handleDoubleNestedChip}
                  handleDoubleNestedChange={handleDoubleNestedChange}
                />
              ) : (
                <ProfessionalActivity
                  user={user}
                  handleChange={handleChange}
                  handleNestedChange={handleNestedChange}
                  handleDoubleNestedChip={handleDoubleNestedChip}
                  handleDeleteChipDiscipline={handleDeleteChipDiscipline}
                  handleDoubleNestedChange={handleDoubleNestedChange}
                />
              )}
              <InterestSelector
                user={user}
                handleNestedChip={handleNestedChip}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={1}
              justifyContent="center"
              sx={{ display: "flex" }}
            >
              <Avatar
                variant="square"
                src={getAvatarByOrganization(user.organizationAffiliated)}
                sx={{ width: 146, height: 146, borderRadius: "5px" }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button
              title="Delete User profile"
              size="small"
              variant="contained"
              startIcon={<DeleteForeverOutlinedIcon />}
              sx={{
                minWidth: 0,
                width: "200px",
                height: "50px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                marginRight: "30px",
                borderColor: "#197278",
                backgroundColor: "#6d071a",
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "red",
                },
                alignSelf: "flex-end",
                marginY: "20px",
              }}
              onClick={() => setOpenDialogDeleteUser(true)}
            >
              Delete profile
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
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
                alignSelf: "flex-end",
                marginY: "20px",
              }}
              onClick={() => handleEditProfileInformation()}
            >
              Edit profile
            </Button>
          </Box>
        </Box>
        <DeleteEntityDialog
          open={openDialogDeleteUser}
          onClose={() => setOpenDialogDeleteUser(false)}
          onConfirm={handleDeleteUserDialog}
          entityType="user profile"
        />
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});

export default ProfileInformation;
