import React, {Component} from 'react';


class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
            bookImageUrl: ''
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.userSearch(this.state.searchName)
    }

    render() {
        return (
            <div className="search-box">
                <form onSubmit={this.userSearch}>
                    <input
                        type="text"
                        name="bookFind"
                        value={this.state.searchName}
                        onChange={e => this.setState({ searchName: e.target.value })}
                    />
                    <button type="submit" onClick={(e) => this.handleClick(e)}>Search</button>
                </form>

            </div>
        )
    }
}

export default SearchBox;