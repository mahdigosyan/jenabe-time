import React from "react";
import { useItems, useAppState } from "../AppContext";

import styles from "./Progress.module.scss";


function Progress() {
    const totalAmount = useAppState().items.length;
    const { paused, completed } = useItems();
    const completedAmount = completed.length;
    const pausedAmount = paused.length;

    let completedPercentage = completedAmount / totalAmount;
  let pausedPercentage = pausedAmount / totalAmount + completedPercentage;

  if (isNaN(completedPercentage)) {
    completedPercentage = 0;
  }
  