import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false as boolean,
  captchaUrl: null as string | null, // if it's null, then captcha isn't required
};

export type InitialStateType = typeof initialState;

export const authReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
  };
};

const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});

export const getAuthUserDate = () => async (dispatch: any) => {
  const response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { login, id: userId, email } = response.data.data;
    dispatch(setAuthUserData(userId, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    //success, get auth data
    dispatch(getAuthUserDate());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }

    const errorMessage =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Something is wrong";

    const action = stopSubmit("login", { _error: errorMessage });
    dispatch(action);
  }
};

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

type GetCaptchaUrlSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: {
    captchaUrl: string;
  };
};

const getCaptchaUrlSuccess = (
  captchaUrl: string
): GetCaptchaUrlSuccessType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};
