import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import useQuestionForm from "../hooks/useQuestionForm";
import CustomTextField from "../components/CustomTextField/CustomTextField";
import { FieldsEnvironmentalArea } from "../../../shared-types/user";
import CustomTagInput from "../components/CustomTag/CustomTag";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionByIdAction } from "../actions/question/question";
import { QuestionResInterface } from "../../../shared-types/questionData";
import { initialQuestionResponseState } from "../types/formData.type";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../hooks/useTranslatedEnum";

const EditQuestion: React.FC = () => {
  const { questionId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation();
  const { translatedFieldsEnvironmentalArea } = useTranslatedEnum();
  const [questionDetailsEdit, setQuestionDetailsEdit] = useState<QuestionResInterface>(initialQuestionResponseState);
  const { question, handleChange, handleNestedChange, handleNestedChip, handleUpdateQuestion } = useQuestionForm({
    onSuccessUpdateQuestion: () => enqueueSnackbar("Question edited successful", { variant: "success" }),
    onErrorUpdateQuestion: () => enqueueSnackbar("Failed to edit the question", { variant: "error" }),
    editQuestion: questionDetailsEdit,
  });

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        if (questionId) {
          const response = await getQuestionByIdAction(questionId);
          setQuestionDetailsEdit(response);
        }
      } catch (error) {
        console.error("Failed to fetch question details", error);
      }
    };
    fetchQuestionDetails();
  }, [questionId]);

  const handleEditQuestion = () => {
    const questionToUpdate: QuestionResInterface = {
      ...question,
      _id: questionDetailsEdit._id,
    };
    handleUpdateQuestion(questionDetailsEdit._id, questionToUpdate);
    navigate(`/question/details/${questionDetailsEdit._id}`);
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
            <Trans i18nKey="edit_questions_title" />
          </Typography>
          <Box my={2}>
            <CustomTextField
              label={t("create_question_title")}
              placeholder={t("create_question_title_placeholder")}
              type="text"
              value={question.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </Box>
          <Box my={2}>
            <CustomTextField
              label={t("create_question_body")}
              placeholder={t("create_question_body_placeholder")}
              type="text"
              value={question.body}
              onChange={(e) => handleChange("body", e.target.value)}
              multiline
              required
            />
          </Box>
          <Typography variant="subtitle2" fontWeight={600} mt={2}>
            <Trans i18nKey="create_question_application_area" />
          </Typography>
          <Box className={classes.chipContainer} mb={2}>
            <>
              {Object.values(FieldsEnvironmentalArea).map((label) => (
                <Chip
                  key={label}
                  label={translatedFieldsEnvironmentalArea[label]}
                  onClick={() => handleNestedChip("fieldsEnvironmentalArea", "generic", label)}
                  sx={{
                    marginRight: "10px",
                    marginTop: "10px",
                    backgroundColor: question.fieldsEnvironmentalArea.generic.includes(label as FieldsEnvironmentalArea)
                      ? "#C8E6C9"
                      : "transparent",
                    color: question.fieldsEnvironmentalArea.generic.includes(label as FieldsEnvironmentalArea)
                      ? "#000"
                      : "",
                    border: "1px solid black",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#C8E6C9",
                    },
                  }}
                  clickable
                />
              ))}
              <CustomTagInput
                label={t("research_activity_and_expertise_environmental_area_button")}
                customTags={question.fieldsEnvironmentalArea.custom}
                setCustomTags={(newCustomTags) =>
                  handleNestedChange("fieldsEnvironmentalArea", "custom", newCustomTags)
                }
              />
            </>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "170px",
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
            onClick={() => handleEditQuestion()}
          >
            <Trans i18nKey="edit_questions_title" />
          </Button>
        </Box>
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
  chipContainer: {
    maxWidth: "800px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5px",
    alignItems: "center",
  },
});

export default EditQuestion;
