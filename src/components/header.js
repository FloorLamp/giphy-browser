import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
    <header
        style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <input type="text" placeholder="Search GIFs..." />
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
