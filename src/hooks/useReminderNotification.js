import { useEffect } from "react";
import { remote } from "electron";
import { useItems } from "../AppContext";

function getTimeCondition(nd) {
    let condition = false;

    switch (remote.getGlobal("notificationSettings").reminderNotification) {
        case "hour":
          condition = nd.getMinutes() === 0 && nd.getSeconds() === 0;
          break;
        case "halfhour":
          condition = nd.getMinutes() % 30 === 0 && nd.getSeconds() === 0;
          break;
        case "quarterhour":
          condition = nd.getMinutes() % 15 === 0 && nd.getSeconds() === 0;
          break;
        default:
          break;
      }

      return condition;
}