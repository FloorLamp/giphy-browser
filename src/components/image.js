import React from "react"

import "./image.css"

const Image = ({ url, onClose }) => {
    return (
        <div className="full-size-wrapper" onClick={onClose}>
            <img className="full-size-image" src={url} />
        </div>
    )
}

export default Image
