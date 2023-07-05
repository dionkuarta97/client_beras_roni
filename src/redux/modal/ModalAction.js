import { defaultDoneState, defaultInitState } from "../helper";

import server from "../server";
import {
  SET_BERAS_CAMPURAN,
  SET_DETAIL_MODAL,
  SET_KELOLA_BERAS,
  SET_MODAL,
  SET_MODAL_DATANG,
  SET_SELECT_MODAL,
} from "./ModalType";

export const setModal = (payload) => {
  return {
    type: SET_MODAL,
    payload,
  };
};

export const getModal = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setModal(defaultInitState));
      server({
        url: "/admin/modal/all",
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: payload,
      })
        .then(({ data }) => {
          dispatch(setModal(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const setKelolaBEras = (payload) => {
  return {
    type: SET_KELOLA_BERAS,
    payload,
  };
};

export const setBerasKelola = (payload) => {
  return {
    type: SET_BERAS_CAMPURAN,
    payload,
  };
};

export const getBerasCampuran = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setBerasKelola(defaultInitState));
      server({
        url: "/admin/modal/beras_kelola/campuran",
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: params,
      })
        .then(({ data }) => {
          dispatch(setBerasKelola(defaultDoneState(data)));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
};

export const createPengolahanBerasCampuran = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/modal_kelola/create/campuran",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di tambahkan");
          dispatch(getBerasCampuran());
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };
};

export const setSelectModal = (payload) => {
  return {
    type: SET_SELECT_MODAL,
    payload,
  };
};

export const getSelectModal = (id) => {
  console.log(id);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setSelectModal(defaultInitState));
      server({
        url: "/admin/modal/select/" + id,
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
      })
        .then(({ data }) => {
          dispatch(setSelectModal(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const getKelolaBeras = (id, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setKelolaBEras(defaultInitState));
      server({
        url: "/admin/modal/beras_kelola/all/" + id,
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: params,
      })
        .then(({ data }) => {
          dispatch(setKelolaBEras(defaultDoneState(data)));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
};

export const setModalDatang = (payload) => {
  return {
    type: SET_MODAL_DATANG,
    payload,
  };
};

export const getModalDatang = (id, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setModalDatang(defaultInitState));
      server({
        url: "/admin/modal/modal_datang/all/" + id,
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: params,
      })
        .then(({ data }) => {
          dispatch(setModalDatang(defaultDoneState(data)));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
};

export const updateModalDatang = (payload, id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/modal_datang/update/" + payload.id,
        method: "PATCH",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di update");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const createKelolaBeras = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/beras_kelola/create",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di tambahkan");
          if (!payload.tipe) {
            dispatch(getKelolaBeras(payload.idModal));
          } else {
            dispatch(getBerasCampuran());
          }
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };
};

export const createPengolahanBeras = (idModal, payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/modal_kelola/create",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di tambahkan");
          dispatch(getKelolaBeras(idModal));
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  };
};

export const updateModalKelola = (payload, idModal) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/modal_kelola/update/" + payload.id,
        method: "PATCH",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di update");
        })
        .then(() => {
          if (idModal) {
            dispatch(getKelolaBeras(idModal));
          } else {
            dispatch(getBerasCampuran());
          }
        })
        .catch(() => {
          reject("terjadi kesalahan");
        });
    });
  };
};

export const createModalDatang = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/modal_datang/create",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di tambahkan");
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(getModalDatang(payload.idModal, { status: "active" }));
        });
    });
  };
};

export const setDetilModal = (payload) => {
  return {
    type: SET_DETAIL_MODAL,
    payload,
  };
};

export const detailModal = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setDetilModal(defaultInitState));
      server({
        url: "/admin/modal/detail/" + payload,
        method: "GET",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
      })
        .then(({ data }) => {
          dispatch(setDetilModal(defaultDoneState(data)));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const createModal = (payload, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setModal(defaultInitState));
      server({
        url: "/admin/modal/create",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil ditambahkan");
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(getModal(params));
        });
    });
  };
};

export const updateModal = (payload, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/update/" + payload.id,
        method: "PATCH",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
        params: params,
      })
        .then(() => {
          resolve("data berhasil di ubah");
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(detailModal(payload.id));
        });
    });
  };
};

export const updateStatusModal = (payload, idModal) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/status/" + payload.id,
        method: "PUT",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di ubah");
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(getModal({ category: idModal }));
        });
    });
  };
};

export const createCampuran = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/beras_kelola/create/campuran",
        method: "POST",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then((data) => {
          console.log(data);
          resolve("data berhasil di tambahkan");
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  };
};

export const updateBerasKelola = (payload, idModal) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: "/admin/modal/beras_kelola/update/" + payload.id,
        method: "PATCH",
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve("data berhasil di update");
        })
        .then(() => {
          if (idModal) {
            dispatch(getKelolaBeras(idModal));
          } else {
            dispatch(getBerasCampuran());
          }
        })
        .catch((err) => {
          console.log(err);
          reject("data gagal di update");
        });
    });
  };
};
