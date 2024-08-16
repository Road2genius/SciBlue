import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import React, { SyntheticEvent, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { QuestionResInterface } from "../../../../shared-types/questionData";
import { UserQuestion } from "../../pages/QuestionsList";
import {
  DiscussionStatus,
  FieldsEnvironmentalArea,
} from "../../../../shared-types/user";
import QuestionCard from "../QuestionCard/QuestionCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type FilterSelection = {
  discussionStatus?: DiscussionStatus;
  fieldsEnvironmentalArea?: FieldsEnvironmentalArea[];
};

const filterSelectionInitial: FilterSelection = {
  discussionStatus: undefined,
  fieldsEnvironmentalArea: [],
};

const applyFilters = (
  questionList: QuestionResInterface[],
  filters: FilterSelection
): QuestionResInterface[] => {
  return questionList.filter((question) => {
    if (
      filters.discussionStatus &&
      question.discussionStatus !== filters.discussionStatus
    ) {
      return false;
    }

    if (
      filters.fieldsEnvironmentalArea &&
      filters.fieldsEnvironmentalArea.length > 0
    ) {
      if (
        !filters.fieldsEnvironmentalArea.some((field) =>
          question.fieldsEnvironmentalArea.generic.includes(field)
        )
      ) {
        return false;
      }
    }

    return true;
  });
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

const TabsQuestionComponent: React.FC<{
  titles: string[];
  questionsList: QuestionResInterface[];
  userCommentedQuestions: QuestionResInterface[];
  userSubmittedQuestions: QuestionResInterface[];
  usersQuestion: { [key: string]: UserQuestion };
}> = ({
  titles,
  questionsList,
  userCommentedQuestions,
  userSubmittedQuestions,
  usersQuestion,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [filterQuestion, setFilterQuestion] = useState<FilterSelection>(
    filterSelectionInitial
  );
  const [filteredQuestions, setFilteredQuestions] =
    useState<QuestionResInterface[]>(questionsList);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFilterQuestion = <K extends keyof FilterSelection>(
    field: K,
    value: FilterSelection[K]
  ) => {
    setFilterQuestion({ ...filterQuestion, [field]: value });
  };

  const handleFilterArrayQuestion = (
    field: keyof FilterSelection,
    item: FieldsEnvironmentalArea
  ) => {
    setFilterQuestion((prevFilterQuestion) => {
      const currentArray = prevFilterQuestion[
        field
      ] as FieldsEnvironmentalArea[];

      if (currentArray.includes(item)) {
        return {
          ...prevFilterQuestion,
          [field]: currentArray.filter((i) => i !== item),
        };
      } else {
        return {
          ...prevFilterQuestion,
          [field]: [...currentArray, item],
        };
      }
    });
  };

  const onApplyFilters = () => {
    const newFilteredQuestions = applyFilters(questionsList, filterQuestion);
    setFilteredQuestions(newFilteredQuestions);
    setOpenFilterModal(false);
  };

  const memoizedFilteredRequests = useMemo(() => {
    if (value === 1) {
      return filteredQuestions.filter((question) =>
        userCommentedQuestions.some(
          (commentedQuestion) => commentedQuestion._id === question._id
        )
      );
    }
    if (value === 2) {
      return filteredQuestions.filter((question) =>
        userSubmittedQuestions.some(
          (submittedQuestion) => submittedQuestion._id === question._id
        )
      );
    }

    return filteredQuestions;
  }, [
    filteredQuestions,
    userCommentedQuestions,
    userSubmittedQuestions,
    value,
  ]);

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
                to="/question/create"
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
                Ask your question
              </Button>
            </Box>
          </Box>
        </Box>
        {memoizedFilteredRequests.map((question, index) => (
          <CustomTabPanel value={index} index={index} key={index}>
            <Box my={1}>
              <QuestionCard question={question} usersQuestion={usersQuestion} />
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
              Discussion statut
            </Typography>
            <IconButton
              aria-label="open"
              onClick={() => setOpenFilterModal(false)}
            >
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            {Object.values(DiscussionStatus).map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  border: "1px solid black",
                  backgroundColor: filterQuestion.discussionStatus?.includes(
                    label as DiscussionStatus
                  )
                    ? "#C8E6C9"
                    : "transparent",
                  color: filterQuestion.discussionStatus?.includes(
                    label as DiscussionStatus
                  )
                    ? "#000"
                    : "",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#C8E6C9",
                  },
                }}
                onClick={() => handleFilterQuestion("discussionStatus", label)}
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
                    filterQuestion.fieldsEnvironmentalArea?.includes(
                      label as FieldsEnvironmentalArea
                    )
                      ? "#C8E6C9"
                      : "transparent",
                  color: filterQuestion.fieldsEnvironmentalArea?.includes(
                    label as FieldsEnvironmentalArea
                  )
                    ? "#000"
                    : "",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#C8E6C9",
                  },
                }}
                onClick={() =>
                  handleFilterArrayQuestion("fieldsEnvironmentalArea", label)
                }
                clickable
              />
            ))}
          </Box>

          <Box display="flex" sx={{ alignSelf: "flex-end" }}>
            <Button
              onClick={() => setFilterQuestion(filterSelectionInitial)}
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

export default TabsQuestionComponent;
