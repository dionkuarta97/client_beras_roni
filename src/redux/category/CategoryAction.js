import { defaultDoneState, defaultInitState } from "../helper";

import server from "../server";

import { SET_CATEGORY, SET_CATEGORY_SELECT } from "./CategoryType";

export const setCategory = (payload) => {
  return {
    type: SET_CATEGORY,
    payload,
  };
};

export const getCategory = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setCategory(defaultInitState));
      server({
        url: "/admin/category/all",
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: payload,
      })
        .then(({ data }) => {
          dispatch(setCategory(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };
};

export const setCategorySelect = (payload) => {
  return {
    type: SET_CATEGORY_SELECT,
    payload,
  };
};

export const getCategorySelect = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setCategorySelect(defaultInitState));
      server({
        url: "/admin/category/select",
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
      })
        .then(({ data }) => {
          dispatch(setCategorySelect(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };
};

export const addCategory = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setCategory(defaultInitState));
      server({
        url: "/admin/category/create",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(getCategory());
        });
    });
  };
};

export const editCategory = (payload, id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setCategory(defaultInitState));
      server({
        url: `/admin/category/update/${id}`,
        method: "PATCH",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(getCategory());
        });
    });
  };
};

export const deleteCategory = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setCategory(defaultInitState));
      server({
        url: `/admin/category/delete/${payload}`,
        method: "DELETE",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(getCategory());
        });
    });
  };
};
