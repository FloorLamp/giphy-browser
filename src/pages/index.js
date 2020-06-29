import React, { Component } from "react"

import Layout from "../components/layout"
import TrendingPage from "./trending"

class IndexPage extends Component {
    render() {
        return (
            <Layout>
                <TrendingPage />
            </Layout>
        )
    }
}

export default IndexPage
