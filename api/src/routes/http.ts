export const BASE_ROUTE = "/api";

export const ENDPOINT = {
  USER: {
    CREATE_USER_PATH: `/users`,
    GET_USER_BY_ID_PATH: `/users/:id`,
    DELETE_USER_PATH: `/users/:id`,
    UPDATE_USER_PATH: `/users/:id`,
    GET_USERS_LIST_PATH: `/users`,
  },
  AUTH: {
    LOGIN_PATH: `/login`,
    LOGOUT_PATH: `/logout/:userId`,
    REFRESH_TOKEN_PATH: `/refresh-token`,
    REQUEST_PASSWORD_RESET_PATH: `/request-password-reset`,
    RESET_PASSWORD_PATH: `/reset-password`,
  },
  REQUEST: {
    CREATE_REQUEST_PATH: `/requests`,
    GET_REQUEST_BY_ID_PATH: `/requests/:id`,
    DELETE_REQUEST_PATH: `/requests/:id`,
    UPDATE_REQUEST_PATH: `/requests/:id`,
    GET_REQUESTS_LIST_PATH: `/requests`,
  },
  REQUEST_COMMENT: {
    CREATE_REQUEST_COMMENT_PATH: `/requests/:requestId/comments`,
    DELETE_REQUEST_COMMENT_PATH: `/requests/comments/:commentId`,
    UPDATE_REQUEST_COMMENT_PATH: `/requests/comments/:commentId`,
    GET_REQUEST_COMMENT_LIST_PATH: `/requests/:requestId/comments`,
  },
  REQUEST_VOTE: {
    SUBMIT_REQUEST_VOTE_PATH: `/requests/:requestId/votes`,
  },
  REQUEST_COMMENT_VOTE: {
    SUBMIT_REQUEST_COMMENT_VOTE_PATH: `/comments/:commentId/votes`,
  },
  QUESTION: {
    CREATE_QUESTION_PATH: `/questions`,
    GET_QUESTION_BY_ID_PATH: `/questions/:questionId`,
    DELETE_QUESTION_PATH: `/questions/:questionId`,
    UPDATE_QUESTION_PATH: `/questions/:questionId`,
    GET_QUESTIONS_LIST_PATH: `/questions`,
  },
  QUESTION_COMMENT: {
    CREATE_QUESTION_COMMENT_PATH: `/questions/:questionId/comments`,
    DELETE_QUESTION_COMMENT_PATH: `/questions/comments/:commentId`,
    UPDATE_QUESTION_COMMENT_PATH: `/questions/comments/:commentId`,
    GET_QUESTION_COMMENT_LIST_PATH: `/questions/:questionId/comments`,
  },
  QUESTION_VOTE: {
    SUBMIT_QUESTION_VOTE_PATH: `/questions/:questionId/votes`,
  },
  QUESTION_COMMENT_VOTE: {
    SUBMIT_QUESTION_COMMENT_VOTE_PATH: `/comments/:commentId/votes`,
  },
};
