import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, Card, Container, Grid, Typography } from "@mui/material";
import useCommunity from "../hooks/useCommunity";
import { UserRes } from "../../../shared-types/userData";
import useSignupForm from "../hooks/useSignupForm";

const Community: React.FC = () => {
  const classes = useStyles();
  const { getCommunityList } = useCommunity();
  const { getAvatarByOrganization } = useSignupForm({});
  const [usersList, setUsersList] = useState<UserRes[]>([]);

  useEffect(() => {
    const fetchCommunityList = async () => {
      const userList = await getCommunityList();
      if (userList) {
        setUsersList(userList);
      }
    };

    fetchCommunityList();
  }, []);

  console.log("usersList", usersList);

  return (
    <Container maxWidth="lg">
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
          Browse the SciBlue Community
        </Typography>
        <Box mt={5}>
          <Grid container spacing={2}>
            {usersList.map((user, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  variant="elevation"
                  elevation={5}
                  sx={{
                    minWidth: 390,
                    minHeight: 290,
                    borderRadius: "8px",
                    border: "2px solid rgba(128, 128, 128, 0.3)",
                  }}
                >
                  <Box display="flex" my={2} ml={2}>
                    <Avatar
                      variant="square"
                      src={getAvatarByOrganization(user.organizationAffiliated)}
                      sx={{ width: 120, height: 120, borderRadius: "5px" }}
                    />
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
                      <Typography
                        variant="subtitle2"
                        sx={{ marginBottom: "30px" }}
                      >
                        {user.organizationName}
                      </Typography>
                      <Typography variant="subtitle2">
                        {user.country}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" my={2} ml={2}>
                    {user.organizationAffiliated} todo: chip
                  </Box>
                  <Box display="flex" my={2} ml={2}>
                    environemental area
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
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
