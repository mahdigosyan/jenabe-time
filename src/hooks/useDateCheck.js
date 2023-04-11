import { useEffect } from "react";
import { format, parseISO, isBefore } from "date-fns";
import { useAppState, useAppReducer } from "../AppContext";
const { remote } = require("electron");


export default function useDateCheck() {
    const { date } = useAppState();
    const dispatch = useAppReducer();
    const storedDate = parseISO(`${date.year}-${date.month}-${date.day}`);

    