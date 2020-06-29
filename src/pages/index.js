import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Loader } from "semantic-ui-react"
import "semantic-ui-css/components/loader.min.css"
import Loadable from "@loadable/component"

import Layout from "../components/layout"
import {
    fetchTrendingIfNeeded,
    fetchNextPage,
    closeImage,
} from "../state/actions"

const LoadableImage = Loadable(() => import("../components/image"))
const LoadableGrid = Loadable(() => import("../components/grid"))

import "./index.css"

class IndexPage extends Component {
    componentDidMount() {
        this.props.fetchTrendingIfNeeded()

        window.addEventListener("scroll", this.handleScroll, true)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = e => {
        // Start fetching nect page when we're two screens away from bottom
        const shouldFetch =
            document.documentElement.scrollTop +
                2 * document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        if (shouldFetch) {
            this.props.fetchNextPage()
        }
    }

    render() {
        const {
            query,
            error,
            trending,
            results,
            openedImage,
            isFetching,
            isDoneFetching,
        } = this.props

        return (
            <Layout>
                {!!openedImage ? (
                    <LoadableImage
                        data={openedImage}
                        onClose={this.props.closeImage}
                    />
                ) : null}
                <LoadableGrid images={!!query ? results : trending} />
                <Loader active={isFetching} inline="centered" />
                {!!query && isDoneFetching && !results.length && (
                    <h2>No results found 😕</h2>
                )}
                {!!error && <h3 className="error">{error}</h3>}
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    query: PropTypes.string,
    error: PropTypes.string,
    openedImage: PropTypes.object,
    results: PropTypes.array.isRequired,
    trending: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isDoneFetching: PropTypes.bool.isRequired,
    fetchTrendingIfNeeded: PropTypes.func.isRequired,
    closeImage: PropTypes.func.isRequired,
}

const mapStateToProps = ({
    query,
    error,
    results,
    trending,
    openedImage,
    isFetching,
    isDoneFetching,
}) => {
    return {
        query,
        error,
        results,
        trending,
        openedImage,
        isFetching,
        isDoneFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrendingIfNeeded: () => dispatch(fetchTrendingIfNeeded()),
        closeImage: () => dispatch(closeImage()),
        fetchNextPage: () => dispatch(fetchNextPage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
