import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Loader } from "semantic-ui-react"
import "semantic-ui-css/components/loader.min.css"

import Layout from "../components/layout"
import Image from "../components/image"
import Grid from "../components/grid"
import {
    fetchTrendingIfNeeded,
    fetchNextPage,
    closeImage,
} from "../state/actions"

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
        const { trending, openedImage, isFetching } = this.props

        return (
            <Layout>
                <Grid images={trending} />
                <Loader active={isFetching} inline="centered" />
                {openedImage ? (
                    <Image url={openedImage} onClose={this.props.closeImage} />
                ) : null}
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    openedImage: PropTypes.string,
    trending: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchTrendingIfNeeded: PropTypes.func.isRequired,
    closeImage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ trending, openedImage, isFetching }) => {
    return { trending, openedImage, isFetching }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrendingIfNeeded: () => dispatch(fetchTrendingIfNeeded()),
        closeImage: () => dispatch(closeImage()),
        fetchNextPage: () => dispatch(fetchNextPage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
