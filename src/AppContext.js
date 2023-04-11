import React, { createContext, useContext, useReducer } from "react";
import { loadState, saveState } from "./local-storage";
import { format } from "date-fns";


export const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext)[0];
}


export function useAppReducer() {
    return useContext(AppContext)[1];
  }
  
  export function useItems() {
    const { items } = useAppState();

    const pending = items.filter(item => item.status === "pending");
  const paused = items.filter(item => item.status === "paused");
  const completed = items.filter(item => item.status === "completed");

  return { pending, paused, completed };
}

