import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GiphySearch from "./GiphySearch";
import axios from "axios";
import fakeSuccessData from "./fake-response-with-results.json";

jest.mock("axios", () => ({
  get: jest.fn(),
}))

beforeEach(() => {
  jest.clearAllMocks();
})

describe("GiphySearch", () => {
  it("should render images with a successfull search.", async () => {
    //prepare la prueba
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: fakeSuccessData }));
    const expectSearchValue = "Welcome"
    //ejecutar
    render(<GiphySearch />);
    screen.getByText("Giphy search");
    const searchInput = screen.getByLabelText("Search");
    const submitBtn = screen.getByText("Go");
    //assert
    fireEvent.change(searchInput, { target: { value: expectSearchValue }});
    fireEvent.click(submitBtn);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.giphy.com/v1/gifs/search`,
      { 
        params: {
          q: expectSearchValue,
          api_key: "7jPydoo1ECn0sU8veaQV8W2FSvRVfqcr",
        }
      }
    );
    expect(screen.getByText("Searching gifs")).toBeInTheDocument();
    await waitFor(() => fakeSuccessData.data.map((image) => expect(screen.getByAltText(image.title)).toBeInTheDocument()));
  });
  it("should render fail message on fail request", async () => {
    // prepara la prueba
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("bad request")));
    // ejecutar
    const expectSearchValue = "Welcome"
    //ejecutar
    render(<GiphySearch />);
    screen.getByText("Giphy search");
    const searchInput = screen.getByLabelText("Search");
    const submitBtn = screen.getByText("Go");
    //assert
    fireEvent.change(searchInput, { target: { value: expectSearchValue }});
    fireEvent.click(submitBtn);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.giphy.com/v1/gifs/search`,
      { 
        params: {
          q: expectSearchValue,
          api_key: "7jPydoo1ECn0sU8veaQV8W2FSvRVfqcr",
        }
      }
    );
    expect(screen.getByText("Searching gifs")).toBeInTheDocument();
    await waitFor (() => expect(screen.getByRole("alert").textContent).toEqual("bad request"));
    // assert

  });
})