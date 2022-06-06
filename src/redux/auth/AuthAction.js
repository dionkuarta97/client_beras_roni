import { SET_LOGIN } from "./AuthType";
import {
  defaultDoneState,
  defaultFailedState,
  defaultInitState,
} from "../helper";

import server from "../server";

export const setLogin = (payload) => {
  return {
    type: SET_LOGIN,
    payload,
  };
};

export function getLogin(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setLogin(defaultInitState));
      server({
        url: "/global/login",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          console.log(data);
          dispatch(setLogin(defaultDoneState(data)));
        })
        .catch((err) => {
          dispatch(setLogin(defaultFailedState(err.response.data)));
          reject(err.response.data);
        });
    });
  };
}
