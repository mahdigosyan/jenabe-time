import React, { createContext, useContext, useReducer } from "react";
import { loadState, saveState } from "./local-storage";
import { format } from "date-fns";


export const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext)[0];
}

