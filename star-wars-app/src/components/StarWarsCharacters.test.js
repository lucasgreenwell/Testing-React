import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, wait } from "@testing-library/react";

import { getData as mockGetData } from "../api/index";
import StarWarsCharacters from "./StarWarsCharacters";




//the worst api test in the
jest.mock("../api/index");

test("Buttons have functionality", async () => {

    //Arrange 

    //fake the api call
  const testData = {
    results: [
      {
        name: "testName",
        id: 1
      }
    ],
    next: "testNext",
    previous: "testPrevious"
  };

  mockGetData.mockResolvedValueOnce(testData);


//set up variables to expect to do things
  const { getByText } = render(<StarWarsCharacters />);
  const nextButton = getByText(/next/i);
  const prevButton = getByText(/previous/i);

  //Act

  fireEvent.click(nextButton);
  fireEvent.click(prevButton);

  //Assert
  expect(mockGetData).toHaveBeenCalledTimes(1);

  wait(() => expect(getByText(/'Rey'/i)));
});
