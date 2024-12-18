import { screen, render, getByRole} from "@testing-library/react";
import user from "@testing-library/user-event"
import Cards from "./card";

test("check heading element",()=>{
    render(<Cards/>)
    const heading=screen.getAllByRole("heading")
    const paragraph=screen.getAllByRole("paragraph")

    expect(heading).toHaveLength(2)
    expect(paragraph).toHaveLength(2)
})