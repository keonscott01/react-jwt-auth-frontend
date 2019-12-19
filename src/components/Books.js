import React, { Component } from 'react';
// import SearchBox from './SearchBox';
import BookList from './BookList';
import { Button } from 'react-bootstrap';




class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchName: '',
            imgUrl: ''
        }
    }

    searchResults = e => {
        this.setState({ searchName: e.target.value })
    }

    render(props) {
        console.log(this.state.books.length > 0)
        console.log(this.state.books.length)
        if(this.props.books.length > 0){
            console.log('booklist')
            return (<BookList books={this.state.books} image={this.state.imgUrl}/>)
            
          }
    }
}

export default Books;
