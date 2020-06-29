import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { openImage } from "../state/actions"
import { isSlowConnection } from "../utils/network"

import "./grid.css"

const Grid = ({ images, onClick }) => {
    const showStillPreviews = isSlowConnection()

    return images.map(gif => {
        // If fixed height 100px isn't available, use fixed height 200px
        const src = showStillPreviews
            ? gif.images.fixed_height_small_still.url ||
              gif.images.fixed_height_still.url
            : gif.images.fixed_height_small.url || gif.images.fixed_height.url

        return (
            <img
                key={gif.id}
                className="grid-image"
                src={src}
                alt={gif.title}
                onClick={() => onClick(src, gif.images.original)}
            />
        )
    })
}

Grid.propTypes = {
    images: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
}

const mapStateToProps = ({ offset }) => {
    return { offset }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: (preview, original) => dispatch(openImage(preview, original)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
