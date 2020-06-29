import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { openImage } from "../state/actions"

import "./grid.css"

const Grid = ({ images, onClick }) =>
    images.map(gif => (
        <img
            key={gif.id}
            className="grid-image"
            src={gif.images.fixed_height_small.url}
            alt={gif.title}
            onClick={() => onClick(gif.images.original.url)}
        />
    ))

Grid.propTypes = {
    images: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
}

const mapStateToProps = ({ offset }) => {
    return { offset }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: url => dispatch(openImage(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
