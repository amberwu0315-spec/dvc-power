import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HomePage, stackRows } from "@/routes/index"

describe("HomePage", () => {
  it("renders the stack landing page", () => {
    render(<HomePage />)

    expect(
      screen.getByRole("heading", { level: 1, name: "DVS Power" })
    ).toBeDefined()
    expect(screen.getByText("TanStack Start (Router + Nitro)")).toBeDefined()
    expect(screen.getByText("Vitest + Testing Library")).toBeDefined()
    expect(screen.getByText("TanStack Start Docs")).toBeDefined()
  })

  it("renders every stack row", () => {
    render(<HomePage />)

    const tableRows = screen.getAllByRole("row")
    expect(tableRows.length).toBe(stackRows.length + 1)
  })
})
