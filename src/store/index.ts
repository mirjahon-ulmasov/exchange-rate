import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export default store;

