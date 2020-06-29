import React, { useState } from "react"

import "./image.css"

import { isSlowConnection } from "../utils/network"

// Render a preview image initially, which will be replaced by the original when fully loaded
const Image = ({ data: { preview, original, width, height }, onClose }) => {
    const [loaded, setLoaded] = useState(false)

    // If slow connection, just show original loading
    const showOriginal = loaded || isSlowConnection()

    return (
        <div className="full-size-wrapper" onClick={onClose}>
            <img
                className="preview-image"
                style={{ opacity: loaded ? 0 : 1 }}
                src={preview}
                width={width}
                height={height}
            />
            <img
                className="original-image"
                style={{ opacity: showOriginal ? 1 : 0 }}
                src={original}
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default Image
