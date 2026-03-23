import { App } from "./app";
import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { MemoryRouter } from "react-router";
describe("app", () => {
  it("renders home", async () => {
    const screen = await render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    await expect
      .element(screen.getByText(/Its not Claw, its Craw!/i))
      .toBeInTheDocument();
  });
  it("renders quickstart", async () => {
    const screen = await render(
      <MemoryRouter initialEntries={["/quickstart"]}>
        <App />
      </MemoryRouter>,
    );
    await expect.element(screen.getByText(/Quick Start/i)).toBeInTheDocument();
  });
});
