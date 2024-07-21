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
    REQUEST_PASSWORD_RESET_PATH: `/request-password-reset`,
    RESET_PASSWORD_PATH: `/reset-password`,
  },
  REQUEST: {
    CREATE_REQUEST_PATH: `/requests`,
    GET_REQUEST_BY_ID_PATH: `/requests/:id`,
    DELETE_REQUEST_PATH: `/requests/:id`,
    UPDATE_REQUEST_PATH: `/requests/:id`,
    GET_REQUESTS_LIST_PATH: `/requests`
  },
};
