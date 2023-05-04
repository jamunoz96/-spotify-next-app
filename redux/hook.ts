import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "./store";
import { setQuery } from "./storeSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useStore = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state: AppState) => state.storeReducer);

  return {
    query,
    setQuery: (param: string) => dispatch(setQuery(param)),
  };
};
