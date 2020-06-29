import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Layout from "../components/layout"
import Image from "../components/image"
import Grid from "../components/grid"
import { fetchTrendingIfNeeded, closeImage } from "../state/actions"

class IndexPage extends Component {
    componentDidMount() {
        this.props.fetchTrendingIfNeeded()
    }

    render() {
        const { trending, openedImage } = this.props

        return (
            <Layout>
                <Grid images={trending} />
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
    fetchTrendingIfNeeded: PropTypes.func.isRequired,
    closeImage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ trending, openedImage }) => {
    return { trending, openedImage }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrendingIfNeeded: () => dispatch(fetchTrendingIfNeeded()),
        closeImage: () => dispatch(closeImage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
