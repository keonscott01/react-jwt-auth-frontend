import React from 'react';


const BookList = (props) => {

    console.log(props.books)
    console.log(props.books.length > 0)
    if(props.books.length > 0){
        console.log('if')
        var books = props.books.map((book, index) => {
            return <div key={index}>
                <h1>{book.volumeInfo.title}</h1>
                <h3>{book.volumeInfo.authors[0]}</h3>
                <p>{book.volumeInfo.publishedDate}</p>
                </div>
        })
    }
     
    return (
        <div>
            <ul>
            {books}
        </ul>
        </div>

    )


}

export default BookList;