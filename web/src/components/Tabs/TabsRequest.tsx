import {
  Box,
  Tabs,
  Tab,
  Button,
  useTheme,
  useMediaQuery,
  Dialog,
  Paper,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { SyntheticEvent, useMemo, useState } from "react";
import { RequestResInterface } from "../../../../shared-types/requestData";
import RequestCard from "../RequestCard/RequestCard";
import { UserRequest } from "../../pages/RequestsList";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  CollaborationStatus,
  FieldsEnvironmentalArea,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "../../../../shared-types/user";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type FilterSelection = {
  collaborationStatus?: CollaborationStatus;
  collaborationType?: TypeOfCollaboration[];
  fieldsEnvironmentalArea?: FieldsEnvironmentalArea[];
  projectProgressStatus?: ProjectProgressStatus;
  projectFunding?: ProjectFunding;
  organizationRequested?: TypeOfOrganization[];
};

type FilterSelectionArrays =
  | TypeOfCollaboration
  | FieldsEnvironmentalArea
  | TypeOfOrganization;

const filterSelectionInitial: FilterSelection = {
  collaborationStatus: undefined,
  collaborationType: [],
  fieldsEnvironmentalArea: [],
  projectProgressStatus: undefined,
  projectFunding: undefined,
  organizationRequested: [],
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const applyFilters = (
  requestList: RequestResInterface[],
  filters: FilterSelection
): RequestResInterface[] => {
  return requestList.filter((request) => {
    if (
      filters.collaborationStatus &&
      request.collaborationStatus !== filters.collaborationStatus
    ) {
      return false;
    }

    if (filters.collaborationType && filters.collaborationType.length > 0) {
      if (
        !filters.collaborationType.some((type) =>
          request.kindOfCollaborationWanted.typeOfCollaboration.includes(type)
        )
      ) {
        return false;
      }
    }

    if (
      filters.fieldsEnvironmentalArea &&
      filters.fieldsEnvironmentalArea.length > 0
    ) {
      if (
        !filters.fieldsEnvironmentalArea.some((field) =>
          request.project.fieldsEnvironmentalArea.generic.includes(field)
        )
      ) {
        return false;
      }
    }

    if (
      filters.projectProgressStatus &&
      request.project.projectProgressStatus !== filters.projectProgressStatus
    ) {
      return false;
    }

    if (
      filters.projectFunding &&
      request.project.projectFunding !== filters.projectFunding
    ) {
      return false;
    }

    if (
      filters.organizationRequested &&
      filters.organizationRequested.length > 0
    ) {
      if (
        !filters.organizationRequested.some((org) =>
          request.specificsSkills.organizationRequested.includes(org)
        )
      ) {
        return false;
      }
    }

    return true;
  });
};

const TabsRequestComponent: React.FC<{
  titles: string[];
  requestsList: RequestResInterface[];
  userCommentedRequests: RequestResInterface[];
  userSubmittedRequests: RequestResInterface[];
  usersRequest: { [key: string]: UserRequest };
}> = ({
  titles,
  requestsList,
  userCommentedRequests,
  userSubmittedRequests,
  usersRequest,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [filterRequest, setFilterRequest] = useState<FilterSelection>(
    filterSelectionInitial
  );
  const [filteredRequests, setFilteredRequests] =
    useState<RequestResInterface[]>(requestsList);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFilterRequest = <K extends keyof FilterSelection>(
    field: K,
    value: FilterSelection[K]
  ) => {
    setFilterRequest({ ...filterRequest, [field]: value });
  };

  const handleFilterArrayRequest = (
    field: keyof FilterSelection,
    item: FilterSelectionArrays
  ) => {
    setFilterRequest((prevFilterRequest) => {
      const currentArray = prevFilterRequest[field] as FilterSelectionArrays[];

      if (currentArray.includes(item)) {
        return {
          ...prevFilterRequest,
          [field]: currentArray.filter((i) => i !== item),
        };
      } else {
        return {
          ...prevFilterRequest,
          [field]: [...currentArray, item],
        };
      }
    });
  };

  const onApplyFilters = () => {
    const newFilteredRequests = applyFilters(requestsList, filterRequest);
    setFilteredRequests(newFilteredRequests);
    setOpenFilterModal(false);
  };

  const memoizedFilteredRequests = useMemo(() => {
    if (value === 1) {
      return filteredRequests.filter((request) =>
        userCommentedRequests.some(
          (commentedRequest) => commentedRequest._id === request._id
        )
      );
    }
    if (value === 2) {
      return filteredRequests.filter((request) =>
        userSubmittedRequests.some(
          (submittedRequest) => submittedRequest._id === request._id
        )
      );
    }

    return filteredRequests;
  }, [filteredRequests, userCommentedRequests, userSubmittedRequests, value]);

  return (
    <>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="inherit"
          variant={isMobile ? "scrollable" : "standard"}
        >
          {titles.map((title: string, index: number) => (
            <Tab
              key={index}
              label={title}
              sx={{
                fontWeight: 500,
                color: "black",
                textTransform: "none",

                "&.Mui-selected": {
                  fontWeight: 700,
                  color: "black",
                },
              }}
            />
          ))}
        </Tabs>
        <Box
          sx={{
            mx: "auto",
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
          }}
        />
        <Box display="flex" flexDirection="column">
          <Box my={5} display="flex" alignItems="center">
            <Box display="flex" mr={1} flexGrow={1}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "150px",
                  borderRadius: "8px",
                  textTransform: "none",
                  height: "45px",
                  fontWeight: 700,
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#006666",
                  },
                  color: "black",
                }}
                onClick={() => setOpenFilterModal(true)}
              >
                Filters
                <Box display="flex" alignItems="center" ml={2}>
                  <TuneRoundedIcon />
                </Box>
              </Button>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/request/create"
                variant="contained"
                color="primary"
                sx={{
                  width: "250px",
                  borderRadius: "8px",
                  textTransform: "none",
                  height: "45px",
                  fontWeight: 700,
                  backgroundColor: "#008080",
                  "&:hover": {
                    backgroundColor: "#006666",
                  },
                }}
              >
                Post a collaboration request
              </Button>
            </Box>
          </Box>
        </Box>

        {memoizedFilteredRequests.map((request, index) => (
          <CustomTabPanel value={index} index={index} key={index}>
            <Box my={1}>
              <RequestCard
                requestId={request._id}
                requestTitle={request.kindOfCollaborationWanted.requestTitle}
                description={request.kindOfCollaborationWanted.description}
                typeOfCollaboration={
                  request.kindOfCollaborationWanted.typeOfCollaboration
                }
                projectStartEndEstimation={
                  request.project.projectStartEndEstimation
                }
                fieldsEnvironmentalAreaCustom={
                  request.project.fieldsEnvironmentalArea.custom
                }
                fieldsEnvironmentalAreaGeneric={
                  request.project.fieldsEnvironmentalArea.generic
                }
                comments={request.comments}
                positiveVotes={request.positiveVotes}
                negativeVotes={request.negativeVotes}
                createdAt={request.createdAt}
                usersRequest={usersRequest}
                collaborationStatus={request.collaborationStatus}
              />
            </Box>
          </CustomTabPanel>
        ))}
      </Box>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        PaperComponent={(props) => (
          <Paper
            {...props}
            elevation={24}
            sx={{ padding: "30px", borderRadius: "8px" }}
          />
        )}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              fontWeight={600}
              mt={3}
              sx={{ flexGrow: 1 }}
            >
              Request statut
            </Typography>
            <IconButton
              aria-label="open"
              onClick={() => setOpenFilterModal(false)}
            >
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            {Object.values(CollaborationStatus).map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  border: "1px solid black",
                  backgroundColor: filterRequest.collaborationStatus?.includes(
                    label as CollaborationStatus
                  )
                    ? "#C8E6C9"
                    : "transparent",
                  color: filterRequest.collaborationStatus?.includes(
                    label as CollaborationStatus
                  )
                    ? "#000"
                    : "",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor:
                      filterRequest.collaborationStatus?.includes(
                        label as CollaborationStatus
                      )
                        ? "#C8E6C9"
                        : "transparent",
                  },
                }}
                onClick={() =>
                  handleFilterRequest("collaborationStatus", label)
                }
                clickable
              />
            ))}
          </Box>
          <Typography variant="body2" fontWeight={600} mt={3}>
            Collaboration type
          </Typography>
          <Box display="flex">
            {Object.values(TypeOfCollaboration).map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  border: "1px solid black",
                  backgroundColor: filterRequest.collaborationType?.includes(
                    label as TypeOfCollaboration
                  )
                    ? "#C8E6C9"
                    : "transparent",
                  color: filterRequest.collaborationType?.includes(
                    label as TypeOfCollaboration
                  )
                    ? "#000"
                    : "",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: filterRequest.collaborationType?.includes(
                      label as TypeOfCollaboration
                    )
                      ? "#C8E6C9"
                      : "transparent",
                  },
                }}
                onClick={() =>
                  handleFilterArrayRequest("collaborationType", label)
                }
                clickable
              />
            ))}
          </Box>
          <Typography variant="body2" fontWeight={600} mt={3}>
            Application area
          </Typography>
          <Box display="flex" sx={{ flexWrap: "wrap" }}>
            {Object.values(FieldsEnvironmentalArea).map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  border: "1px solid black",
                  backgroundColor:
                    filterRequest.fieldsEnvironmentalArea?.includes(
                      label as FieldsEnvironmentalArea
                    )
                      ? "#C8E6C9"
                      : "transparent",
                  color: filterRequest.fieldsEnvironmentalArea?.includes(
                    label as FieldsEnvironmentalArea
                  )
                    ? "#000"
                    : "",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor:
                      filterRequest.fieldsEnvironmentalArea?.includes(
                        label as FieldsEnvironmentalArea
                      )
                        ? "#C8E6C9"
                        : "transparent",
                  },
                }}
                onClick={() =>
                  handleFilterArrayRequest("fieldsEnvironmentalArea", label)
                }
                clickable
              />
            ))}
          </Box>
          <Typography variant="body2" fontWeight={600} mt={3}>
            Project&apos;s progress status
          </Typography>
          <Box display="flex">
            {Object.values(ProjectProgressStatus)
              .filter((label) => label !== "")
              .map((label) => (
                <Chip
                  key={label}
                  label={label}
                  sx={{
                    marginRight: "10px",
                    marginTop: "10px",
                    border: "1px solid black",
                    backgroundColor:
                      filterRequest.projectProgressStatus?.includes(
                        label as ProjectProgressStatus
                      )
                        ? "#C8E6C9"
                        : "transparent",
                    color: filterRequest.projectProgressStatus?.includes(
                      label as ProjectProgressStatus
                    )
                      ? "#000"
                      : "",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor:
                        filterRequest.projectProgressStatus?.includes(
                          label as ProjectProgressStatus
                        )
                          ? "#C8E6C9"
                          : "transparent",
                    },
                  }}
                  onClick={() =>
                    handleFilterRequest("projectProgressStatus", label)
                  }
                  clickable
                />
              ))}
          </Box>
          <Typography variant="body2" fontWeight={600} mt={3}>
            Project&apos;s funding
          </Typography>
          <Box display="flex">
            {Object.values(ProjectFunding)
              .filter((label) => label !== "")
              .map((label) => (
                <Chip
                  key={label}
                  label={label}
                  sx={{
                    marginRight: "10px",
                    marginTop: "10px",
                    border: "1px solid black",
                    backgroundColor: filterRequest.projectFunding?.includes(
                      label as ProjectFunding
                    )
                      ? "#C8E6C9"
                      : "transparent",
                    color: filterRequest.projectFunding?.includes(
                      label as ProjectFunding
                    )
                      ? "#000"
                      : "",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: filterRequest.projectFunding?.includes(
                        label as ProjectFunding
                      )
                        ? "#C8E6C9"
                        : "transparent",
                    },
                  }}
                  onClick={() => handleFilterRequest("projectFunding", label)}
                  clickable
                />
              ))}
          </Box>
          <Typography variant="body2" fontWeight={600} mt={3}>
            Organization requested
          </Typography>
          <Box display="flex" sx={{ flexWrap: "wrap" }}>
            {Object.values(TypeOfOrganization).map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  border: "1px solid black",
                  backgroundColor:
                    filterRequest.organizationRequested?.includes(
                      label as TypeOfOrganization
                    )
                      ? "#C8E6C9"
                      : "transparent",
                  color: filterRequest.organizationRequested?.includes(
                    label as TypeOfOrganization
                  )
                    ? "#000"
                    : "",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor:
                      filterRequest.organizationRequested?.includes(
                        label as TypeOfOrganization
                      )
                        ? "#C8E6C9"
                        : "transparent",
                  },
                }}
                onClick={() =>
                  handleFilterArrayRequest("organizationRequested", label)
                }
                clickable
              />
            ))}
          </Box>
          <Box display="flex" sx={{ alignSelf: "flex-end" }}>
            <Button
              onClick={() => setFilterRequest(filterSelectionInitial)}
              sx={{
                textTransform: "none",
                color: "#008080",
                fontWeight: 700,
                textDecoration: "underline",
                marginRight: "25px",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              Clear all filters
            </Button>
            <Button
              onClick={onApplyFilters}
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
              Apply filters
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default TabsRequestComponent;
