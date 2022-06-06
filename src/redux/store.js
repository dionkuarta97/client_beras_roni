import storage from "redux-persist/lib/storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import AuthReducer from "./auth/AuthReducer";
import Cookies from "cookies-js";
import { CookieStorage } from "redux-persist-cookie-storage";
import CategoryReducer from "./category/CategoryReducer";
import ModalReducer from "./modal/ModalReducer";
import PenjualanReducer from "./penjualan/PenjualanReducer";

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies),
};

const reducer = combineReducers({
  AuthReducer: persistReducer(persistConfig, AuthReducer),
  CategoryReducer: CategoryReducer,
  ModalReducer: ModalReducer,
  PenjualanReducer: PenjualanReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
