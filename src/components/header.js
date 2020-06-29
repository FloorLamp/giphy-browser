import PropTypes from "prop-types"
import { connect } from "react-redux"
import React from "react"
import { debounce } from "lodash"

import { inputQuery, fetchSearchResults } from "../state/actions"

const Header = ({ onChange, query }) => (
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
            <input
                type="text"
                placeholder="Search GIFs..."
                onChange={onChange}
                value={query}
            />
        </div>
    </header>
)

Header.propTypes = {
    query: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = ({ query }) => {
    return { query }
}

// Debounce the fetching of search results for 300ms
const debouncedFetchSearchResults = debounce(
    dispatch => dispatch(fetchSearchResults()),
    300
)

const mapDispatchToProps = dispatch => {
    return {
        onChange: e => {
            dispatch(inputQuery(e.target.value))
            debouncedFetchSearchResults(dispatch)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
