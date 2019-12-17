import React, { Component } from 'react';
import SearchBox from './SearchBox';
import BookList from './BookList';
import axios from 'axios';


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchName: '',
            imgUrl: ''
        }
    }


    userSearch = (e) => {
        // console.log(e)
        axios.request({
            url: 'https://www.googleapis.com/books/v1/volumes?q=' + e + '&key=AIzaSyD-bXZCEMGjGD9B-LKJ9rHbLyKYsCqhiDg',
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

    searchResults = e => {
        this.setState({ searchName: e.target.value })
    }

    render(props) {
        console.log(this.state.books.length > 0)
        console.log(this.state.books.length)
        if(this.state.books.length > 0){
            console.log('booklist')
            return (<BookList books={this.state.books} image={this.state.imgUrl}/>)
          }else{
            console.log('search')
            return(<SearchBox onChange={this.userSearch} userSearch={this.userSearch} />)
             
            
          }
    }
}

export default Books;
