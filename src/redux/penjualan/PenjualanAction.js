import { defaultDoneState, defaultInitState } from "../helper";
import server from "../server";
import {
  SET_DETAIL_PENJUALAN,
  SET_LANGGANAN,
  SET_PENJUALAN,
} from "./PenjualanType";

export const setDetailPenjualan = (payload) => {
  return {
    type: SET_DETAIL_PENJUALAN,
    payload,
  };
};

export const setLangganan = (payload) => {
  return {
    type: SET_LANGGANAN,
    payload,
  };
};

export const getAllLangganan = (params) => {
  return (dispatch, getState) => {
    dispatch(setLangganan(defaultInitState));
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/langganan",
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params,
      })
        .then(({ data }) => {
          dispatch(setLangganan(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const getDetialPenjualan = (id, params) => {
  return (dispatch, getState) => {
    dispatch(setDetailPenjualan(defaultInitState));
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/penjualan/" + id,
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params,
      })
        .then(({ data }) => {
          dispatch(setDetailPenjualan(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const createPenjualanCampuran = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/penjualan/create/campuran",
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
          reject(err);
        });
    });
  };
};

export const createModalPenjualan = (payload) => {
  return (dispatch, getState) => {
    dispatch(setDetailPenjualan(defaultInitState));
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/penjualan/modal_penjualan/create",
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
          reject(err);
        })
        .finally(() => {
          dispatch(getDetialPenjualan(payload.idPenjualan));
        });
    });
  };
};

export const setPenjualan = (payload) => {
  return {
    type: SET_PENJUALAN,
    payload,
  };
};

export const getAllPenjual = (params) => {
  console.log(params);
  return (dispatch, getState) => {
    dispatch(setPenjualan(defaultInitState));
    return new Promise((reject, resolve) => {
      server({
        url: "/admin/penjualan",
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params,
      })
        .then(({ data }) => {
          dispatch(setPenjualan(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const updatePenjualan = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/penjualan/update/" + payload.penjualan.id,
        method: "PUT",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
