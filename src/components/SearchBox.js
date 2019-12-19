import React, {Component} from 'react';
import axios from 'axios'
import BookList from './BookList'

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
            bookImageUrl: '',
            books: []
        }
    }

    handleClick = (e) => {        e.preventDefault();

     
            // console.log(e)
            axios.request({
                url: 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchName + '&key=AIzaSyD-bXZCEMGjGD9B-LKJ9rHbLyKYsCqhiDg',
                method: 'get',
            })
                .then(response => {
                    this.setState({ books:response.data.items })
                    console.log(response.data.items)
                    
                })
                .catch(() => {
                    return <div>
                        <p>Error</p>
                    </div>
                })
        
    }


    render() {
        let books
        if(this.state.books.length > 0) books = <BookList books ={this.state.books}></BookList>
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
                {books}

            </div>
        )
    }
}

export default SearchBox;