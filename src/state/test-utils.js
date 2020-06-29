import React from "react"
import { render as rtlRender } from "@testing-library/react"
import { Provider } from "react-redux"

import createStore from "./createStore"

function render(ui, { store = createStore(), ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react"

// override render method
export { render }
