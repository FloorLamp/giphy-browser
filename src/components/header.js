import PropTypes from "prop-types"
import { connect } from "react-redux"
import React from "react"
import { debounce } from "lodash"
import { Icon, Input } from "semantic-ui-react"
import "semantic-ui-css/components/input.min.css"
import "semantic-ui-css/components/icon.min.css"

import { inputQuery, fetchSearchResults } from "../state/actions"

const Header = ({ onChange, clearQuery, query }) => (
    <header>
        <div className="container search-container">
            <Input
                fluid
                placeholder="Search GIFs..."
                icon={
                    !!query ? <Icon name="x" onClick={clearQuery} link /> : null
                }
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

// Debounce the fetching of search results for 350ms
const debouncedFetchSearchResults = debounce(
    dispatch => dispatch(fetchSearchResults()),
    350
)

const mapDispatchToProps = dispatch => {
    return {
        onChange: e => {
            dispatch(inputQuery(e.target.value))
            debouncedFetchSearchResults(dispatch)
        },
        clearQuery: () => dispatch(inputQuery("")),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
