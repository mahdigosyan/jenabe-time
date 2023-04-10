import React from "react";
import { useAppReducer } from "../AppContext";
import styles from "./Item.module.scss";

// Individual todo item
function Item({ item }) {
    const dispatch = useAppReducer();
    let text = item.text;
    let paused = item.status === "paused";
    let completed = item.status === "completed";
    
    function deleteItem() {
        dispatch({ type: "DELETE_ITEM", item });
      }

      function pauseItem() {
        const pausedItem = { ...item, status: "paused" };
        dispatch({ type: "UPDATE_ITEM", item: pausedItem });
      }

      function resumeItem() {
        const pendingItem = { ...item, status: "pending" };
        dispatch({ type: "UPDATE_ITEM", item: pendingItem });
      }
    
      function completeItem() {
        const completedItem = { ...item, status: "completed" };
        dispatch({ type: "UPDATE_ITEM", item: completedItem });
      }

      