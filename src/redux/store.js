/* eslint-disable import/no-anonymous-default-export */
import { createStore } from "redux";
import Reducer from "./Reducer";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer(persistConfig, Reducer);
export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
