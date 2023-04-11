import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from "@reach/accordion";
import "@reach/accordion/styles.css";

import { useAppReducer, useItems } from "../AppContext";
import Progress from "./Progress";
import AddItemForm from "./AddItemForm";
import Item from "./Item";
import styles from "./ItemList.module.scss";
import arrow from "../img/arrow.svg";
import alldone from "../img/alldone.svg";

function ItemList() {
    const dispatch = useAppReducer();
    const { pending, paused, completed } = useItems();
  
    return (
      <div className="item-list">
        <Progress />
        <AddItemForm />
        {pending.length > 0 ? (
          <>
            {pending.map(item => {
              return <Item item={item} key={item.key} />;
            })}
          </>
        ) : (
          <div className={styles.alldone}>
            <img src={alldone} alt="Nothing to do!" />
          </div>
        )}
        