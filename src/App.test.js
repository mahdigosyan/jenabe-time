import React from "react";
import { render } from "@testing-library/react";
import { format } from "date-fns";
import App from "./App";

test("renders the day of the month", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(format(new Date(), "d"));
  expect(linkElement).toBeInTheDocument();
});

