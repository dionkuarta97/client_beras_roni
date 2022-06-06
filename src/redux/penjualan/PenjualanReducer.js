import {
  SET_DETAIL_PENJUALAN,
  SET_LANGGANAN,
  SET_PENJUALAN,
} from "./PenjualanType";

const initialState = {
  detailPenjualan: {
    data: null,
    loading: false,
    error: null,
  },
  penjualan: {
    data: null,
    loading: false,
    error: null,
  },
  langganan: {
    data: null,
    loading: false,
    error: null,
  },
};

function PenjualanReducer(state = initialState, action) {
  if (action.type === SET_DETAIL_PENJUALAN) {
    return { ...state, detailPenjualan: action.payload };
  } else if (action.type === SET_PENJUALAN) {
    return { ...state, penjualan: action.payload };
  } else if (action.type === SET_LANGGANAN) {
    return { ...state, langganan: action.payload };
  }
  return state;
}

export default PenjualanReducer;
