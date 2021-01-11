import React from "react";
import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

test("Mi primera prueba", () => {
  // preparacion
  
  // ejecucion
  render(<Hello />);

  // assert 
  expect(screen.getByText("Hello Testing Talk")).toBeInTheDocument();
  
});