import {
  SET_DETAIL_MODAL,
  SET_MODAL,
  SET_MODAL_DATANG,
  SET_KELOLA_BERAS,
  SET_BERAS_CAMPURAN,
  SET_SELECT_MODAL,
} from "./ModalType";

const initialState = {
  modal: {
    data: null,
    error: null,
    loading: false,
  },
  detailModal: {
    data: null,
    error: null,
    loading: false,
  },
  modalDatang: {
    data: null,
    error: null,
    loading: false,
  },
  kelolaBeras: {
    data: null,
    error: null,
    loading: false,
  },
  berasCampuran: {
    data: null,
    error: null,
    loading: false,
  },
  selectModal: {
    data: null,
    error: null,
    loading: false,
  },
};

const ModalReducer = (state = initialState, action) => {
  if (action.type === SET_MODAL) {
    return { ...state, modal: action.payload };
  } else if (action.type === SET_DETAIL_MODAL) {
    return { ...state, detailModal: action.payload };
  } else if (action.type === SET_MODAL_DATANG) {
    return { ...state, modalDatang: action.payload };
  } else if (action.type === SET_KELOLA_BERAS) {
    return { ...state, kelolaBeras: action.payload };
  } else if (action.type === SET_BERAS_CAMPURAN) {
    return { ...state, berasCampuran: action.payload };
  } else if (action.type === SET_SELECT_MODAL) {
    return { ...state, selectModal: action.payload };
  }
  return state;
};

export default ModalReducer;
