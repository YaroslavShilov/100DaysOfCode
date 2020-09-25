import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux/redux-store";

export type PostType = {
  id: number;
  likesCount: number;
  message: string;
};

export type ContactsType = {
  github?: string;
  vk?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
  mainLink?: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob?: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts?: ContactsType;
  photos?: PhotosType;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
