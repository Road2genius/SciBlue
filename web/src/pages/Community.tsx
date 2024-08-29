import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import useCommunity from "../hooks/useCommunity";
import { UserRes } from "../../../shared-types/userData";
import useSignupForm from "../hooks/useSignupForm";
import {
  CountryCodes,
  CountryNames,
  LanguageCodes,
  Languages,
} from "../../../shared-types/user";
import FlagComponent from "../components/FlagComponent/FlagComponent";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UserDetailModal from "../components/UserDetailModal/UserDetailModal";
import { getAvatar } from "../components/Navbar/avatar";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../hooks/useTranslatedEnum";

const Community: React.FC = () => {
  const { organizationIsResearcher } = useSignupForm({});
  const [openUserDetail, setOpenUserDetail] = useState<{
    open: boolean;
    user?: UserRes;
  }>({ open: false });
  const classes = useStyles();
  const { getCommunityList } = useCommunity();
  const [usersList, setUsersList] = useState<UserRes[]>([]);
  const { t } = useTranslation();
  const { translatedOrganizations,translatedFieldsEnvironmentalArea } = useTranslatedEnum();

  const getCountryKeyFromValue = (
    countryName: string
  ): keyof typeof CountryNames | undefined => {
    return Object.keys(CountryNames).find(
      (key) => CountryNames[key as keyof typeof CountryNames] === countryName
    ) as keyof typeof CountryNames | undefined;
  };

  const getCountryCode = (countryName: string): string | undefined => {
    const countryKey = getCountryKeyFromValue(countryName);
    return countryKey ? CountryCodes[countryKey] : undefined;
  };

  const getLanguageKeyFromValue = (
    languageName: string
  ): keyof typeof Languages | undefined => {
    return Object.keys(Languages).find(
      (key) => Languages[key as keyof typeof Languages] === languageName
    ) as keyof typeof Languages | undefined;
  };

  const getLanguageCode = (languageName: string): string | undefined => {
    const languageKey = getLanguageKeyFromValue(languageName);
    return languageKey ? LanguageCodes[languageKey] : undefined;
  };

  useEffect(() => {
    const fetchCommunityList = async () => {
      const userList = await getCommunityList();
      if (userList) {
        setUsersList(userList);
      }
    };

    fetchCommunityList();
  }, []);

  return (
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
        <Typography
          variant="h4"
          fontWeight={700}
          color="#197278"
          sx={{ marginBottom: "30px" }}
        >
          <Trans i18nKey="community_page_main_title" />
        </Typography>
        <Box mt={5}>
          <Grid container spacing={5}>
            {usersList.map((user, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Card
                    variant="elevation"
                    elevation={5}
                    sx={{
                      width: 350,
                      height: 320,
                      borderRadius: "8px",
                      border: "2px solid rgba(128, 128, 128, 0.3)",
                    }}
                    onClick={() =>
                      setOpenUserDetail({ open: true, user: user })
                    }
                  >
                    <Box display="flex" my={2} ml={2}>
                      <Avatar
                        variant="square"
                        src={getAvatar(user.avatar ?? "")}
                        sx={{ width: 120, height: 120, borderRadius: "5px" }}
                      />
                      {!user.privacyLevel.mode ? (
                        <Box display="flex" flexDirection="column" ml={2}>
                          <Box display="flex">
                            <Typography
                              variant="subtitle2"
                              sx={{ marginBottom: "5px" }}
                            >
                              {user.firstName}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ marginLeft: "5px" }}
                            >
                              {user.lastName}
                            </Typography>
                          </Box>
                          <Box display="flex" flexGrow={1}>
                            <Typography
                              variant="subtitle2"
                              sx={{ marginBottom: "30px" }}
                            >
                              {user.organizationName}
                            </Typography>
                          </Box>
                          <Box mt={-1}>
                            <FlagComponent
                              countryCode={getCountryCode(
                                user.country
                              )?.toUpperCase()}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box display="flex" flexDirection="column" ml={2}>
                          <Box display="flex" flexGrow={1}>
                            <Typography
                              variant="subtitle2"
                              sx={{ marginBottom: "5px" }}
                            >
                              {user.privacyLevel.username}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="center">
                            <Tooltip title="This user has activated private mode">
                              <VisibilityOffIcon
                                fontSize="inherit"
                                sx={{ fontSize: "64px", cursor: "pointer" }}
                              />
                            </Tooltip>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box display="flex" my={2} ml={2}>
                      {user.organizationAffiliated && (
                        <Chip
                          size="small"
                          key={index}
                          label={translatedOrganizations[user.organizationAffiliated]}
                          variant="outlined"
                          sx={{
                            backgroundColor: "#DAD7CD",
                            color: "black",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                    </Box>
                    <Box display="flex" my={2} ml={2}>
                      {organizationIsResearcher(user.organizationAffiliated) ? (
                        <Box>
                          {user.researchActivityAndExpertise.fieldsEnvironmentalArea.generic?.map(
                            (genericEnvironmental, index) => (
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
                                  flexWrap: "wrap",
                                  marginTop: "5px",
                                }}
                              />
                            )
                          )}
                        </Box>
                      ) : (
                        <>
                          {user.professionalActivityAndExpertise.fieldsEnvironmentalArea?.generic?.map(
                            (genericEnvironmental, index) => (
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
                                }}
                              />
                            )
                          )}
                        </>
                      )}
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box display="flex" my={2} ml={2} flexGrow={1}>
                        {user.funder && (
                          <Chip
                            size="small"
                            key={index}
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
                      <Box mr={1} display="flex">
                        {user.languages.map(
                          (lang: Languages, index: number) => (
                            <Box key={index} display="flex" mr={1}>
                              <FlagComponent
                                isRound
                                countryCode={getLanguageCode(
                                  lang
                                )?.toUpperCase()}
                              />
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Box>
      <UserDetailModal
        open={openUserDetail.open}
        handleClose={() => setOpenUserDetail({ open: false })}
        getCountryCode={getCountryCode}
        getLanguageCode={getLanguageCode}
        user={openUserDetail.user}
      />
    </Container>
  );
};
export default Community;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
