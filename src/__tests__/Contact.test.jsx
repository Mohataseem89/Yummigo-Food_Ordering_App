import React from "react"
import { render, screen } from "@testing-library/react"
import Contact from "../components/Contact"
import "@testing-library/jest-dom";

test('Contact component renders correctly', () => {
    render(<Contact />)
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
})
test('check button inside Contact component renders correctly', () => {
    render(<Contact />)
    const button = screen.getByRole("button", { name: /send message/i });
    expect(button).toBeInTheDocument();
})
test('check input bbox inside Contact component renders correctly', () => {
    render(<Contact />)
    const input = screen.getByPlaceholderText("Name");
    expect(input).toBeInTheDocument();
})
it('Should check two input boxes inside Contact component renders correctly', () => {
    render(<Contact />)
    // const input = screen.getAllByPlaceholderText("Name");
    const inputboxes = screen.getAllByRole("textbox");
    // console.log(inputboxes.length);
    // expect(inputboxes).toBeInTheDocument();
    expect(inputboxes.length).toBe(3); // Name and Message
})