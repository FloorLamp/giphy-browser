import React from "react"
import { render, fireEvent } from "../state/test-utils"

import IndexPage from "../pages/index"

describe(`Index`, () => {
    it(`loads 50 imgs by default`, async () => {
        const { findAllByRole, findByPlaceholderText } = render(<IndexPage />)

        const imgs = await findAllByRole("img")

        expect(imgs).toHaveLength(50)
    })

    it(`loads search results for "bbq"`, async () => {
        const { findAllByRole, findByPlaceholderText } = render(<IndexPage />)
        const input = await findByPlaceholderText("search", { exact: false })
        fireEvent.change(input, { target: { value: "bbq" } })

        const imgs = await findAllByRole("img")
        expect(imgs.length).toBeGreaterThanOrEqual(1)
    })

    it(`shows no results for "kjsdhfksdhfjkldhsjkafhd"`, async () => {
        const { findByText, findByPlaceholderText } = render(<IndexPage />)
        const input = await findByPlaceholderText("search", { exact: false })
        fireEvent.change(input, {
            target: { value: "kjsdhfksdhfjkldhsjkafhd" },
        })

        const error = await findByText("No results found", { exact: false })
        expect(error).not.toBeNull()
    })
})
