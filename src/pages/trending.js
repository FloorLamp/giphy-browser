import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { fetchTrendingIfNeeded } from "../state/actions"

class TrendingPage extends Component {
    componentDidMount() {
        this.props.fetchTrendingIfNeeded()
    }

    render() {
        return this.props.trending.map(gif => (
            <img
                id={gif.id}
                src={gif.images.fixed_height_small_still.url}
                alt={gif.title}
            />
        ))
    }
}

TrendingPage.propTypes = {
    trending: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    fetchTrendingIfNeeded: PropTypes.func.isRequired,
}

const mapStateToProps = ({ trending, offset }) => {
    return { trending, offset }
}

const mapDispatchToProps = dispatch => {
    return { fetchTrendingIfNeeded: () => dispatch(fetchTrendingIfNeeded()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)
