import React, { createContext, useContext, useReducer } from "react";
import { loadState, saveState } from "./local-storage";
import { format } from "date-fns";

