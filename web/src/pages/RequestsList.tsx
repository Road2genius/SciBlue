import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import TabsComponent from "../components/Tabs/Tabs";
import {
  getRequestCommentListAction,
  getRequestListAction,
} from "../actions/request/request";
import { RequestResInterface } from "../../../shared-types/requestData";
import { getUserByIdAction } from "../actions/user/user";
import { OrganizationAffiliated } from "../../../shared-types/user";
import { useUserContext } from "../context/UserContext";

export interface UserRequest {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  organization?: OrganizationAffiliated;
}

const RequestsList: React.FC = () => {
  const classes = useStyles();
  const [requestsList, setRequestsList] = useState<RequestResInterface[]>([]);
  const [usersList, setUsersList] = useState<{ [key: string]: UserRequest }>(
    {}
  );
  const [userCommentedRequests, setUserCommentedRequests] = useState<
    RequestResInterface[]
  >([]);
  const [userSubmittedRequests, setUserSubmittedRequests] = useState<
    RequestResInterface[]
  >([]);
  const { userContext } = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequestsAndUsers = async () => {
      try {
        const requests = await getRequestListAction();
        setRequestsList(requests);

        const uniqueUserIds = [
          ...new Set(requests.map((request) => request.userId)),
        ];

        const usersData = await Promise.all(
          uniqueUserIds.map((id) => getUserByIdAction(id))
        );

        const usersMap: { [key: string]: UserRequest } = requests.reduce(
          (acc, request) => {
            const user = usersData.find((user) => user._id === request.userId);
            if (user) {
              acc[request._id] = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                organization: user.organizationAffiliated[0],
              };
            }
            return acc;
          },
          {} as { [key: string]: UserRequest }
        );
        setUsersList(usersMap);

        const commentedRequests = [];
        const submittedRequests = [];
        for (const request of requests) {
          const comments = await getRequestCommentListAction(request._id);
          if (
            comments.some((comment) => comment.userId === userContext?.userId)
          ) {
            commentedRequests.push(request);
          }
          if (request.userId === userContext?.userId) {
            submittedRequests.push(request);
          }
        }

        setUserCommentedRequests(commentedRequests);
        setUserSubmittedRequests(submittedRequests);
      } catch (err) {
        console.log("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsAndUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

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
        <Typography variant="h4" fontWeight={700} color="#197278" mb={4}>
          Collaboration requests
        </Typography>
        <TabsComponent
          titles={[
            "All requests",
            "Requests you have answered",
            "Requests you have submitted",
          ]}
          requestsList={requestsList}
          usersRequest={usersList}
          userCommentedRequests={userCommentedRequests}
          userSubmittedRequests={userSubmittedRequests}
        />
      </Box>
    </Container>
  );
};

export default RequestsList;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
