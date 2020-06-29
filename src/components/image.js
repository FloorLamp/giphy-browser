import React, { useState } from "react"

import "./image.css"

// Render a preview image initially, which will be replaced by the original when fully loaded
const Image = ({ data: { preview, original, width, height }, onClose }) => {
    const [loaded, setLoaded] = useState(false)

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
                style={{ opacity: loaded ? 1 : 0 }}
                src={original}
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default Image
